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
    let prevPrices = Number(first.markPrice)
    let prevTs = first.timestamp
    let o = prevPrices
    let h = prevPrices
    let l = prevPrices
    let c = prevPrices
    let countPerInterval = 1;  // number of prices in current interval
    for (let i = prices.length-2; i >= 0; i--) {
        const ts = prices[i].timestamp;
        const price = Number(prices[i].markPrice);
        //const [ts, price] = prices[i]
        const tsGroup = ts - (ts % periodTime)

        if (prevTs > ts) {
            logger.warn(`Invalid order prevTs: ${prevTs} ts: ${ts}`)
            continue
        }

        if (prevTsGroup !== tsGroup) {
            if (countPerInterval == 1) {
                candles.push({ timestamp: prevTsGroup, o, h: h * 1.0003, l: l * 0.9996, c });
            } else {
                candles.push({ timestamp: prevTsGroup, o, h, l, c });
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

    var web3 = new Web3(new Web3.providers.HttpProvider(httpProvider[chainId]))
    var myContract = new web3.eth.Contract(readerABI,contracts[chainId]['reader'])
    let _data = await myContract.methods.getSymbolsInfo(contracts[chainId]['pool'],[]).call().then((value)=>{return value})
    let data = []
    for(let i=0;i<_data.length;i++){
        if (_data[i][0]=="option"){
            data.push({
                symbol:_data[i][1],
                markPrice:_data[i][35],
                chainId:Number(chainId),
                timestamp:timestamp
            })
        }
    }
    await OptionkPriceModel.bulkCreate(data, { ignoreDuplicates: true })
    logger.info("Save %s option data in to database",data.length)
    setTimeout(fetchOptionPrice,1000*60)
}

export default function routes(app) {
    app.get('/api/option',async(req,res,next)=>{
        let symbol = req.query.symbol
        let chainId = req.query.chainId
        let period = req.query.period
        
        const prices = await OptionkPriceModel.findAll({
            attributes: ["timestamp","markPrice"],
            where: {
                chainId: chainId,
                symbol: symbol
            },
            order: [
                ['timestamp',"DESC"]
            ]
        })

        let data = getCandles(prices,period)

        res.send(data)
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
        if (IS_PRODUCTION) {
        if (err.code === 400) {
            response = err.message
        }
        } else {
        response = err.stack
        }
        res.status(statusCode)
        res.send(response)
    })
}