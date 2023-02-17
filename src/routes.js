import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { renderToString } from 'react-dom/server';
import fetch from 'cross-fetch';
import sizeof from 'object-sizeof'
import Web3 from 'web3';
import { readerABI } from '../abi/Reader';
import { contracts,httpProvider } from './helpers';
import App from './App';
import { getLogger } from './helpers'
import { sequelize } from './database.js';
import { OptionkPriceModel } from './OptionPrice';
import { ApolloClient, InMemoryCache, gql, HttpLink } from '@apollo/client'
import { Op } from 'sequelize';
import { ethers } from 'ethers';
import axios from 'axios';


const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

sequelize.sync().then(() => {
    console.log("[INFO] Database is ready")
});

const logger = getLogger('routes')

const cssLinksFromAssets = (assets, entrypoint) => {
    return assets[entrypoint] ? assets[entrypoint].css ?
    assets[entrypoint].css.map(asset=>
      `<link rel="stylesheet" href="${asset}">`
    ).join('') : '' : '';
  };
  
const jsScriptTagsFromAssets = (assets, entrypoint, extra = '') => {
return assets[entrypoint] ? assets[entrypoint].js ?
assets[entrypoint].js.map(asset=>
    `<script src="${asset}"${extra}></script>`
).join('') : '' : '';
};

function createHttpError(code, message) {
    const error = new Error(message)
    error.code = code
    return error
}

const periodsMap = {
    '1m': 60 * 1,
    '5m': 60 * 5,
    '15m': 60 * 15,
    '1h': 60 * 60,
    '4h': 60 * 60 * 4,
    '1d': 60 * 60 * 24,
    '1w': 60 * 60 * 24 * 7
}

function getCandles(prices,period='1m'){
    const periodTime = periodsMap[period]
    const candles = []
    const first = prices[prices.length-1]
    let prevTsGroup = Math.floor(first.timestamp / periodTime) * periodTime
    let prevPrices = Number(first.price)
    let prevTs = first.timestamp
    let o = prevPrices
    let h = prevPrices
    let l = prevPrices
    let c = prevPrices
    let countPerInterval = 1;  // number of prices in current interval
    for (let i = prices.length-2; i >= 0; i--) {
        const ts = prices[i].timestamp;
        const price = Number(prices[i].price);
        //const [ts, price] = prices[i]
        const tsGroup = ts - (ts % periodTime)

        if (prevTs > ts) {
            logger.warn(`Invalid order prevTs: ${prevTs} ts: ${ts}`)
            continue
        }

        if (prevTsGroup !== tsGroup) {
            while(prevTsGroup!==tsGroup){
                if (countPerInterval == 1) {
                    candles.push({ timestamp: prevTsGroup, o, h: h * 1.0003, l: l * 0.9996, c });
                } else {
                    candles.push({ timestamp: prevTsGroup, o, h, l, c });
                }
                prevTsGroup += periodTime
            }
            countPerInterval = 0;
            o = c
            h = o > c ? o : c
            l = o < c ? o : c
        }
        c = price
        h = h > price ? h : price
        l = l < price ? l : price
        prevTsGroup = tsGroup
        prevTs = ts
        countPerInterval += 1;
    }
    // last interval might not be a completed interval, so need to handle separately
    if (countPerInterval == 1) {
        // console.log(`final push1, prevTsGroup:${prevTsGroup} h:${h}, l:${l}, o:${o}, c:${c}`);
        candles.push({ timestamp: prevTsGroup, o, h: h * 1.0003, l: l * 0.9996, c });
    } else {
        //console.log(`final push1, prevTsGroup:${prevTsGroup} h:${h}, l:${l}, o:${o}, c:${c}`);
        candles.push({ timestamp: prevTsGroup, o, h, l, c });
    }
    return candles
}

fetchOptionPrice()
async function fetchOptionPrice(){
    let chainId = '80001'
    let timestamp = Math.floor(Math.floor(Date.now()/1000)/60)*60

    logger.debug("Fetching option data for chainId:%s, timestamp:%s",chainId,timestamp)

    try{
        var web3 = new Web3(new Web3.providers.HttpProvider(httpProvider[chainId]))
        var myContract = new web3.eth.Contract(readerABI,contracts[chainId]['reader'])
        let _data = await myContract.methods.getSymbolsInfo(contracts[chainId]['pool'],[]).call().then((value)=>{return value})
        let data = []
        for(let i=0;i<_data.length;i++){
            if (_data[i][0]=="option"){
                data.push({
                    symbol:_data[i][1],
                    price:_data[i][35],
                    chainId:Number(chainId),
                    timestamp:timestamp
                })
            }
        }
        await OptionkPriceModel.bulkCreate(data, { ignoreDuplicates: true })
        logger.info("Save %s option data in to database",data.length)
        setTimeout(fetchOptionPrice,1000*60)
    }catch(e){
        logger.error(e)
        setTimeout(fetchOptionPrice,500)
    }
}

const apolloOptions = {
    query: {
      fetchPolicy: 'no-cache'
    },
    watchQuery: {
      fetchPolicy: 'no-cache'
    }
  }
const polygonGraphClient = new ApolloClient({
    link: new HttpLink({ uri: 'https://api.thegraph.com/subgraphs/name/linja19/chainlink-price-mumbai', fetch }),
    cache: new InMemoryCache(),
    defaultOptions: apolloOptions
})

const tokenList = {
    "BTC":"0x05d6f705C80d9F812d9bc1A142A655CDb25e2571",
    "ETH":"0xeBC8428DC717D440d5deCE1547456B115b868F0e",
    "USDC" : "0x7a96316B13bD7d0529e701d2ED8b9fC4E4fd8696",
    "USDT" : "0x158653b66fd72555F68eDf983736781E471639Cc",
}

const tokenName2Addr = (token) => {
    return tokenList[token]
}

async function getVolData(){
    let volData = await axios.get('https://sig.oraclum.io/unsigned?symbols=VOL-BTCUSD,VOL-ETHUSD')
    .then(function (response) {
        return response.data
    })
    .catch(function (error) {
        console.log(error);
        return {}
    });
    return volData
}

async function signVolData(volData){
    let signatures = [];
    let privateKey = process.env.SIGNER_PRIVATE_KEY
    if (!privateKey){
        return []
    }
    let wallet = new ethers.Wallet(privateKey);
    Object.entries(volData).forEach(async ([key, value]) => {
        let symbolId
        value = "0.9"
        if(key=="VOL-BTCUSD"){
        symbolId = '0x21b5e575db5908f82bf406cb4dd9a5b6c4002f75e43e9a309d52ce4781fd0a4f'
        }else{ //VOL-ETHUSD
        symbolId = '0xd688cdd1e80f5af29b34377f1b82df91cbf6f697a25a9b3fd3eac5e52da25ed9'
        }
        let timestamp = Math.round(Date.now()/1000)
        let messageHash = ethers.utils.solidityKeccak256(['bytes32','uint256','uint256'],[symbolId,timestamp,ethers.utils.parseUnits(value, 18)])
        let messageHashBinary = ethers.utils.arrayify(messageHash)
        let signature = await wallet.signMessage(messageHashBinary)
        let r = signature.slice(0, 66)
        let s = '0x' + signature.slice(66, 130)
        let v = '0x' + signature.slice(130, 132)
        signatures.push({
        "oracleSymbolId": symbolId,
        "timestamp": Math.round(Date.now()/1000),
        "value": ethers.utils.parseUnits(value, 18),
        "v": parseInt(v,16),
        "r": r,
        "s": s
        })
    });
    // console.log("oracle signatures",signatures)
    return signatures
}

async function fetchFuturePrice(chainId,symbol,start=0,from,to){
    let timestampOP = {}
    if (from&&to){
      timestampOP = `timestamp_gte: ${from},timestamp_lte: ${to}`
    }else if(from){
      timestampOP = `timestamp_gte: ${from}`
    }else if(to){
      timestampOP = `timestamp_lte: ${to}`
    }else{
      timestampOP = ``
    }

    // let tokenAddr = tokenName2Addr(symbol)
    // logger.info(tokenAddr)
    const entities = "chainlinkPrices"
    const fragment = () => {
        return `${entities}(
        first: 1000
        skip: ${start}
        orderBy: timestamp
        orderDirection: desc
        where: {
            token: "${symbol}",
            ${timestampOP}
        }
        ) { token,price:value,timestamp }\n`
    }
    
    const queryString = `{
        p0: ${fragment()}
    }`
    
    const query = gql(queryString)
    
    const graphClient = polygonGraphClient
    const { data } = await graphClient.query({query})
    const prices = [
        ...data.p0,
    ]
    for(let i=0;i<prices.length;i++){
        prices[i].price = prices[i].price/1e8
    }
    return prices
}

export default function routes(app) {
    app.get('/api/option',async(req,res,next)=>{
        let symbol = req.query.symbol
        let chainId = req.query.chainId
        let period = req.query.period
        let from = req.query.from
        let to = req.query.to

        if (!period || !periodsMap[period]) {
            next(createHttpError(400, `Invalid period. Valid periods are ${Object.keys(periodsMap)}`))
            return
        }

        let timestampOP = {}
        if (from&&to){
          timestampOP = { [Op.between] : [from, to] }
        }else if(from){
          timestampOP = { [Op.gte] : [from] }
        }else if(to){
          timestampOP = { [Op.lte] : [to] }
        }else{
          timestampOP = { [Op.gte] : 0 }
        }
        
        const prices = await OptionkPriceModel.findAll({
            attributes: ["timestamp","price"],
            where: {
                chainId: chainId,
                symbol: symbol,
                timestamp:timestampOP
            },
            order: [
                ['timestamp',"DESC"]
            ]
        })

        for(let i=0;i<prices.length;i++){
            prices[i].price = prices[i].price/1e18
        }

        let data = getCandles(prices,period)

        res.send(data)
    })

    app.get('/api/futures',async(req,res,next)=>{
        let symbol = req.query.symbol
        let chainId = req.query.chainId
        let period = req.query.period
        let from = req.query.from
        let to = req.query.to

        if (!period || !periodsMap[period]) {
            next(createHttpError(400, `Invalid period. Valid periods are ${Object.keys(periodsMap)}`))
            return
        }

        try{
            let priceList = await fetchFuturePrice(chainId,symbol,0,from,to)   // get the first 1000 token
            let n = 1000
            let _newPriceList
            do{                                     // get the remaining token
                _newPriceList = await fetchFuturePrice(chainId,symbol,n,from,to)
                priceList = priceList.concat(_newPriceList)
                n += 1000
            }while(_newPriceList.length!=0&&n<6000)
            
            if (priceList.length!=0){
                let candles = getCandles(priceList,period)
                res.send(candles)
            }else{
                res.send([])
            }
            
        }catch(e){
            logger.error(e)
            next(e)
            return
        }
        
    })

    app.get('/api/oracle-signatures',async(req,res,next)=>{
        const unsigned = req.query.unsigned?req.query.unsigned:true
        const volData = await getVolData()
        if (unsigned==true){
            res.send(volData)
            return
        }
        const signatures = await signVolData(volData)
        res.send(signatures)
    })

    const cssAssetsTag = cssLinksFromAssets(assets, 'client')
    const jsAssetsTag = jsScriptTagsFromAssets(assets, 'client', ' defer crossorigin')

    app.get('/*', (req, res, next) => {
        if (res.headersSent) {
        next()
        return
        }

        const context = {};
        const markup = renderToString(
        <StaticRouter context={context} location={req.url}>
            <App />
        </StaticRouter>
        );
        res.set('Content-Type', 'text/html')

        res.status(200).send(
        `<!doctype html>
            <html lang="">
            <head>
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta charset="utf-8" />
                <title>GMX analytics</title>
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <link rel="icon" type="image/png" href="/favicon.png" />
                ${cssAssetsTag}
            </head>
            <body>
                <div id="root">${markup}</div>
                ${jsAssetsTag}
            </body>
        </html>`
        );
        next()
    });

    app.use('/api', function (err, req, res, next) {
        res.set('Content-Type', 'text/plain')
        const statusCode = Number(err.code) || 500
        let response = ''
        
        if (err.code === 400) {
            response = err.message
        }
        
        res.status(statusCode)
        res.send(response)
    })
}