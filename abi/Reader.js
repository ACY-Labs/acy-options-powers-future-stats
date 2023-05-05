export const readerABI = [
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "symbolsLens_",
              "type": "address"
          }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "pool_",
              "type": "address"
          },
          {
              "internalType": "address",
              "name": "account_",
              "type": "address"
          },
          {
              "internalType": "string",
              "name": "symbolName",
              "type": "string"
          },
          {
              "internalType": "int256",
              "name": "tradeVolume",
              "type": "int256"
          }
      ],
      "name": "estimateLiquidationPrice",
      "outputs": [
          {
              "internalType": "int256",
              "name": "liquidationPrice",
              "type": "int256"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "pool_",
              "type": "address"
          },
          {
              "internalType": "address",
              "name": "account_",
              "type": "address"
          },
          {
              "internalType": "string",
              "name": "symbolName",
              "type": "string"
          },
          {
              "internalType": "bool",
              "name": "isLong",
              "type": "bool"
          }
      ],
      "name": "estimateMaxVolume",
      "outputs": [
          {
              "internalType": "int256",
              "name": "maxVolume",
              "type": "int256"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "pool_",
              "type": "address"
          },
          {
              "internalType": "address",
              "name": "account_",
              "type": "address"
          },
          {
              "components": [
                  {
                      "internalType": "string",
                      "name": "symbol",
                      "type": "string"
                  },
                  {
                      "internalType": "int256",
                      "name": "indexPrice",
                      "type": "int256"
                  },
                  {
                      "internalType": "int256",
                      "name": "volatility",
                      "type": "int256"
                  }
              ],
              "internalType": "struct ISymbolsLens.PriceAndVolatility[]",
              "name": "pvs",
              "type": "tuple[]"
          }
      ],
      "name": "getInfo",
      "outputs": [
          {
              "components": [
                  {
                      "internalType": "address",
                      "name": "pool",
                      "type": "address"
                  },
                  {
                      "internalType": "address",
                      "name": "implementation",
                      "type": "address"
                  },
                  {
                      "internalType": "address",
                      "name": "protocolFeeCollector",
                      "type": "address"
                  },
                  {
                      "internalType": "address",
                      "name": "tokenB0",
                      "type": "address"
                  },
                  {
                      "internalType": "address",
                      "name": "tokenWETH",
                      "type": "address"
                  },
                  {
                      "internalType": "address",
                      "name": "vTokenB0",
                      "type": "address"
                  },
                  {
                      "internalType": "address",
                      "name": "vTokenETH",
                      "type": "address"
                  },
                  {
                      "internalType": "address",
                      "name": "lToken",
                      "type": "address"
                  },
                  {
                      "internalType": "address",
                      "name": "pToken",
                      "type": "address"
                  },
                  {
                      "internalType": "address",
                      "name": "oracleManager",
                      "type": "address"
                  },
                  {
                      "internalType": "address",
                      "name": "swapper",
                      "type": "address"
                  },
                  {
                      "internalType": "address",
                      "name": "symbolManager",
                      "type": "address"
                  },
                  {
                      "internalType": "uint256",
                      "name": "reserveRatioB0",
                      "type": "uint256"
                  },
                  {
                      "internalType": "int256",
                      "name": "minRatioB0",
                      "type": "int256"
                  },
                  {
                      "internalType": "int256",
                      "name": "poolInitialMarginMultiplier",
                      "type": "int256"
                  },
                  {
                      "internalType": "int256",
                      "name": "protocolFeeCollectRatio",
                      "type": "int256"
                  },
                  {
                      "internalType": "int256",
                      "name": "minLiquidationReward",
                      "type": "int256"
                  },
                  {
                      "internalType": "int256",
                      "name": "maxLiquidationReward",
                      "type": "int256"
                  },
                  {
                      "internalType": "int256",
                      "name": "liquidationRewardCutRatio",
                      "type": "int256"
                  },
                  {
                      "internalType": "int256",
                      "name": "liquidity",
                      "type": "int256"
                  },
                  {
                      "internalType": "int256",
                      "name": "lpsPnl",
                      "type": "int256"
                  },
                  {
                      "internalType": "int256",
                      "name": "cumulativePnlPerLiquidity",
                      "type": "int256"
                  },
                  {
                      "internalType": "int256",
                      "name": "protocolFeeAccrued",
                      "type": "int256"
                  },
                  {
                      "internalType": "address",
                      "name": "symbolManagerImplementation",
                      "type": "address"
                  },
                  {
                      "internalType": "int256",
                      "name": "initialMarginRequired",
                      "type": "int256"
                  },
                  {
                      "internalType": "uint256",
                      "name": "totalSupply",
                      "type": "uint256"
                  }
              ],
              "internalType": "struct DeriLens.PoolInfo",
              "name": "poolInfo",
              "type": "tuple"
          },
          {
              "components": [
                  {
                      "internalType": "string",
                      "name": "category",
                      "type": "string"
                  },
                  {
                      "internalType": "string",
                      "name": "symbol",
                      "type": "string"
                  },
                  {
                      "internalType": "address",
                      "name": "symbolAddress",
                      "type": "address"
                  },
                  {
                      "internalType": "address",
                      "name": "implementation",
                      "type": "address"
                  },
                  {
                      "internalType": "address",
                      "name": "manager",
                      "type": "address"
                  },
                  {
                      "internalType": "address",
                      "name": "oracleManager",
                      "type": "address"
                  },
                  {
                      "internalType": "bytes32",
                      "name": "symbolId",
                      "type": "bytes32"
                  },
                  {
                      "internalType": "int256",
                      "name": "feeRatio",
                      "type": "int256"
                  },
                  {
                      "internalType": "int256",
                      "name": "alpha",
                      "type": "int256"
                  },
                  {
                      "internalType": "int256",
                      "name": "fundingPeriod",
                      "type": "int256"
                  },
                  {
                      "internalType": "int256",
                      "name": "minTradeVolume",
                      "type": "int256"
                  },
                  {
                      "internalType": "int256",
                      "name": "minInitialMarginRatio",
                      "type": "int256"
                  },
                  {
                      "internalType": "int256",
                      "name": "initialMarginRatio",
                      "type": "int256"
                  },
                  {
                      "internalType": "int256",
                      "name": "maintenanceMarginRatio",
                      "type": "int256"
                  },
                  {
                      "internalType": "int256",
                      "name": "pricePercentThreshold",
                      "type": "int256"
                  },
                  {
                      "internalType": "uint256",
                      "name": "timeThreshold",
                      "type": "uint256"
                  },
                  {
                      "internalType": "bool",
                      "name": "isCloseOnly",
                      "type": "bool"
                  },
                  {
                      "internalType": "bytes32",
                      "name": "priceId",
                      "type": "bytes32"
                  },
                  {
                      "internalType": "bytes32",
                      "name": "volatilityId",
                      "type": "bytes32"
                  },
                  {
                      "internalType": "int256",
                      "name": "feeRatioITM",
                      "type": "int256"
                  },
                  {
                      "internalType": "int256",
                      "name": "feeRatioOTM",
                      "type": "int256"
                  },
                  {
                      "internalType": "int256",
                      "name": "strikePrice",
                      "type": "int256"
                  },
                  {
                      "internalType": "bool",
                      "name": "isCall",
                      "type": "bool"
                  },
                  {
                      "internalType": "int256",
                      "name": "netVolume",
                      "type": "int256"
                  },
                  {
                      "internalType": "int256",
                      "name": "netCost",
                      "type": "int256"
                  },
                  {
                      "internalType": "int256",
                      "name": "indexPrice",
                      "type": "int256"
                  },
                  {
                      "internalType": "uint256",
                      "name": "fundingTimestamp",
                      "type": "uint256"
                  },
                  {
                      "internalType": "int256",
                      "name": "cumulativeFundingPerVolume",
                      "type": "int256"
                  },
                  {
                      "internalType": "int256",
                      "name": "tradersPnl",
                      "type": "int256"
                  },
                  {
                      "internalType": "int256",
                      "name": "initialMarginRequired",
                      "type": "int256"
                  },
                  {
                      "internalType": "uint256",
                      "name": "nPositionHolders",
                      "type": "uint256"
                  },
                  {
                      "internalType": "int256",
                      "name": "curIndexPrice",
                      "type": "int256"
                  },
                  {
                      "internalType": "int256",
                      "name": "curVolatility",
                      "type": "int256"
                  },
                  {
                      "internalType": "int256",
                      "name": "curCumulativeFundingPerVolume",
                      "type": "int256"
                  },
                  {
                      "internalType": "int256",
                      "name": "K",
                      "type": "int256"
                  },
                  {
                      "internalType": "int256",
                      "name": "markPrice",
                      "type": "int256"
                  },
                  {
                      "internalType": "int256",
                      "name": "funding",
                      "type": "int256"
                  },
                  {
                      "internalType": "int256",
                      "name": "timeValue",
                      "type": "int256"
                  },
                  {
                      "internalType": "int256",
                      "name": "delta",
                      "type": "int256"
                  },
                  {
                      "internalType": "int256",
                      "name": "u",
                      "type": "int256"
                  },
                  {
                      "internalType": "int256",
                      "name": "power",
                      "type": "int256"
                  },
                  {
                      "internalType": "int256",
                      "name": "hT",
                      "type": "int256"
                  },
                  {
                      "internalType": "int256",
                      "name": "powerPrice",
                      "type": "int256"
                  },
                  {
                      "internalType": "int256",
                      "name": "theoreticalPrice",
                      "type": "int256"
                  }
              ],
              "internalType": "struct ISymbolsLens.SymbolInfo[]",
              "name": "symbolsInfo",
              "type": "tuple[]"
          },
          {
              "components": [
                  {
                      "internalType": "address",
                      "name": "account",
                      "type": "address"
                  },
                  {
                      "internalType": "uint256",
                      "name": "pTokenId",
                      "type": "uint256"
                  },
                  {
                      "internalType": "int256",
                      "name": "amountB0",
                      "type": "int256"
                  },
                  {
                      "components": [
                          {
                              "internalType": "address",
                              "name": "symbolAddress",
                              "type": "address"
                          },
                          {
                              "internalType": "string",
                              "name": "symbol",
                              "type": "string"
                          },
                          {
                              "internalType": "int256",
                              "name": "volume",
                              "type": "int256"
                          },
                          {
                              "internalType": "int256",
                              "name": "cost",
                              "type": "int256"
                          },
                          {
                              "internalType": "int256",
                              "name": "cumulativeFundingPerVolume",
                              "type": "int256"
                          },
                          {
                              "internalType": "int256",
                              "name": "margin",
                              "type": "int256"
                          },
                          {
                              "internalType": "int256",
                              "name": "marginUsed",
                              "type": "int256"
                          },
                          {
                              "internalType": "uint256",
                              "name": "vaultLiquidity",
                              "type": "uint256"
                          },
                          {
                              "internalType": "address",
                              "name": "vault",
                              "type": "address"
                          },
                          {
                              "internalType": "int256",
                              "name": "leverage",
                              "type": "int256"
                          },
                          {
                              "internalType": "int256",
                              "name": "liquidationPrice",
                              "type": "int256"
                          }
                      ],
                      "internalType": "struct DeriLens.PositionInfo[]",
                      "name": "positions",
                      "type": "tuple[]"
                  }
              ],
              "internalType": "struct DeriLens.TdInfo",
              "name": "tdInfo",
              "type": "tuple"
          },
          {
              "components": [
                  {
                      "internalType": "address",
                      "name": "token",
                      "type": "address"
                  },
                  {
                      "internalType": "uint256",
                      "name": "price",
                      "type": "uint256"
                  },
                  {
                      "internalType": "uint256",
                      "name": "balance",
                      "type": "uint256"
                  },
                  {
                      "internalType": "string",
                      "name": "symbol",
                      "type": "string"
                  }
              ],
              "internalType": "struct DeriLens.TokenInfo[]",
              "name": "tokenInfo",
              "type": "tuple[]"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "pool_",
              "type": "address"
          },
          {
              "internalType": "address",
              "name": "account_",
              "type": "address"
          }
      ],
      "name": "getLpInfo",
      "outputs": [
          {
              "components": [
                  {
                      "internalType": "address",
                      "name": "account",
                      "type": "address"
                  },
                  {
                      "internalType": "uint256",
                      "name": "lTokenId",
                      "type": "uint256"
                  },
                  {
                      "internalType": "address",
                      "name": "vault",
                      "type": "address"
                  },
                  {
                      "internalType": "int256",
                      "name": "amountB0",
                      "type": "int256"
                  },
                  {
                      "internalType": "int256",
                      "name": "liquidity",
                      "type": "int256"
                  },
                  {
                      "internalType": "int256",
                      "name": "cumulativePnlPerLiquidity",
                      "type": "int256"
                  },
                  {
                      "internalType": "uint256",
                      "name": "vaultLiquidity",
                      "type": "uint256"
                  }
              ],
              "internalType": "struct DeriLens.LpInfo",
              "name": "info",
              "type": "tuple"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "pool_",
              "type": "address"
          }
      ],
      "name": "getPoolInfo",
      "outputs": [
          {
              "components": [
                  {
                      "internalType": "address",
                      "name": "pool",
                      "type": "address"
                  },
                  {
                      "internalType": "address",
                      "name": "implementation",
                      "type": "address"
                  },
                  {
                      "internalType": "address",
                      "name": "protocolFeeCollector",
                      "type": "address"
                  },
                  {
                      "internalType": "address",
                      "name": "tokenB0",
                      "type": "address"
                  },
                  {
                      "internalType": "address",
                      "name": "tokenWETH",
                      "type": "address"
                  },
                  {
                      "internalType": "address",
                      "name": "vTokenB0",
                      "type": "address"
                  },
                  {
                      "internalType": "address",
                      "name": "vTokenETH",
                      "type": "address"
                  },
                  {
                      "internalType": "address",
                      "name": "lToken",
                      "type": "address"
                  },
                  {
                      "internalType": "address",
                      "name": "pToken",
                      "type": "address"
                  },
                  {
                      "internalType": "address",
                      "name": "oracleManager",
                      "type": "address"
                  },
                  {
                      "internalType": "address",
                      "name": "swapper",
                      "type": "address"
                  },
                  {
                      "internalType": "address",
                      "name": "symbolManager",
                      "type": "address"
                  },
                  {
                      "internalType": "uint256",
                      "name": "reserveRatioB0",
                      "type": "uint256"
                  },
                  {
                      "internalType": "int256",
                      "name": "minRatioB0",
                      "type": "int256"
                  },
                  {
                      "internalType": "int256",
                      "name": "poolInitialMarginMultiplier",
                      "type": "int256"
                  },
                  {
                      "internalType": "int256",
                      "name": "protocolFeeCollectRatio",
                      "type": "int256"
                  },
                  {
                      "internalType": "int256",
                      "name": "minLiquidationReward",
                      "type": "int256"
                  },
                  {
                      "internalType": "int256",
                      "name": "maxLiquidationReward",
                      "type": "int256"
                  },
                  {
                      "internalType": "int256",
                      "name": "liquidationRewardCutRatio",
                      "type": "int256"
                  },
                  {
                      "internalType": "int256",
                      "name": "liquidity",
                      "type": "int256"
                  },
                  {
                      "internalType": "int256",
                      "name": "lpsPnl",
                      "type": "int256"
                  },
                  {
                      "internalType": "int256",
                      "name": "cumulativePnlPerLiquidity",
                      "type": "int256"
                  },
                  {
                      "internalType": "int256",
                      "name": "protocolFeeAccrued",
                      "type": "int256"
                  },
                  {
                      "internalType": "address",
                      "name": "symbolManagerImplementation",
                      "type": "address"
                  },
                  {
                      "internalType": "int256",
                      "name": "initialMarginRequired",
                      "type": "int256"
                  },
                  {
                      "internalType": "uint256",
                      "name": "totalSupply",
                      "type": "uint256"
                  }
              ],
              "internalType": "struct DeriLens.PoolInfo",
              "name": "info",
              "type": "tuple"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "pool_",
              "type": "address"
          },
          {
              "internalType": "string",
              "name": "symbolName",
              "type": "string"
          },
          {
              "components": [
                  {
                      "internalType": "string",
                      "name": "symbol",
                      "type": "string"
                  },
                  {
                      "internalType": "int256",
                      "name": "indexPrice",
                      "type": "int256"
                  },
                  {
                      "internalType": "int256",
                      "name": "volatility",
                      "type": "int256"
                  }
              ],
              "internalType": "struct ISymbolsLens.PriceAndVolatility[]",
              "name": "pvs",
              "type": "tuple[]"
          }
      ],
      "name": "getSymbolInfo",
      "outputs": [
          {
              "components": [
                  {
                      "internalType": "string",
                      "name": "category",
                      "type": "string"
                  },
                  {
                      "internalType": "string",
                      "name": "symbol",
                      "type": "string"
                  },
                  {
                      "internalType": "address",
                      "name": "symbolAddress",
                      "type": "address"
                  },
                  {
                      "internalType": "address",
                      "name": "implementation",
                      "type": "address"
                  },
                  {
                      "internalType": "address",
                      "name": "manager",
                      "type": "address"
                  },
                  {
                      "internalType": "address",
                      "name": "oracleManager",
                      "type": "address"
                  },
                  {
                      "internalType": "bytes32",
                      "name": "symbolId",
                      "type": "bytes32"
                  },
                  {
                      "internalType": "int256",
                      "name": "feeRatio",
                      "type": "int256"
                  },
                  {
                      "internalType": "int256",
                      "name": "alpha",
                      "type": "int256"
                  },
                  {
                      "internalType": "int256",
                      "name": "fundingPeriod",
                      "type": "int256"
                  },
                  {
                      "internalType": "int256",
                      "name": "minTradeVolume",
                      "type": "int256"
                  },
                  {
                      "internalType": "int256",
                      "name": "minInitialMarginRatio",
                      "type": "int256"
                  },
                  {
                      "internalType": "int256",
                      "name": "initialMarginRatio",
                      "type": "int256"
                  },
                  {
                      "internalType": "int256",
                      "name": "maintenanceMarginRatio",
                      "type": "int256"
                  },
                  {
                      "internalType": "int256",
                      "name": "pricePercentThreshold",
                      "type": "int256"
                  },
                  {
                      "internalType": "uint256",
                      "name": "timeThreshold",
                      "type": "uint256"
                  },
                  {
                      "internalType": "bool",
                      "name": "isCloseOnly",
                      "type": "bool"
                  },
                  {
                      "internalType": "bytes32",
                      "name": "priceId",
                      "type": "bytes32"
                  },
                  {
                      "internalType": "bytes32",
                      "name": "volatilityId",
                      "type": "bytes32"
                  },
                  {
                      "internalType": "int256",
                      "name": "feeRatioITM",
                      "type": "int256"
                  },
                  {
                      "internalType": "int256",
                      "name": "feeRatioOTM",
                      "type": "int256"
                  },
                  {
                      "internalType": "int256",
                      "name": "strikePrice",
                      "type": "int256"
                  },
                  {
                      "internalType": "bool",
                      "name": "isCall",
                      "type": "bool"
                  },
                  {
                      "internalType": "int256",
                      "name": "netVolume",
                      "type": "int256"
                  },
                  {
                      "internalType": "int256",
                      "name": "netCost",
                      "type": "int256"
                  },
                  {
                      "internalType": "int256",
                      "name": "indexPrice",
                      "type": "int256"
                  },
                  {
                      "internalType": "uint256",
                      "name": "fundingTimestamp",
                      "type": "uint256"
                  },
                  {
                      "internalType": "int256",
                      "name": "cumulativeFundingPerVolume",
                      "type": "int256"
                  },
                  {
                      "internalType": "int256",
                      "name": "tradersPnl",
                      "type": "int256"
                  },
                  {
                      "internalType": "int256",
                      "name": "initialMarginRequired",
                      "type": "int256"
                  },
                  {
                      "internalType": "uint256",
                      "name": "nPositionHolders",
                      "type": "uint256"
                  },
                  {
                      "internalType": "int256",
                      "name": "curIndexPrice",
                      "type": "int256"
                  },
                  {
                      "internalType": "int256",
                      "name": "curVolatility",
                      "type": "int256"
                  },
                  {
                      "internalType": "int256",
                      "name": "curCumulativeFundingPerVolume",
                      "type": "int256"
                  },
                  {
                      "internalType": "int256",
                      "name": "K",
                      "type": "int256"
                  },
                  {
                      "internalType": "int256",
                      "name": "markPrice",
                      "type": "int256"
                  },
                  {
                      "internalType": "int256",
                      "name": "funding",
                      "type": "int256"
                  },
                  {
                      "internalType": "int256",
                      "name": "timeValue",
                      "type": "int256"
                  },
                  {
                      "internalType": "int256",
                      "name": "delta",
                      "type": "int256"
                  },
                  {
                      "internalType": "int256",
                      "name": "u",
                      "type": "int256"
                  },
                  {
                      "internalType": "int256",
                      "name": "power",
                      "type": "int256"
                  },
                  {
                      "internalType": "int256",
                      "name": "hT",
                      "type": "int256"
                  },
                  {
                      "internalType": "int256",
                      "name": "powerPrice",
                      "type": "int256"
                  },
                  {
                      "internalType": "int256",
                      "name": "theoreticalPrice",
                      "type": "int256"
                  }
              ],
              "internalType": "struct ISymbolsLens.SymbolInfo",
              "name": "info",
              "type": "tuple"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "pool_",
              "type": "address"
          },
          {
              "components": [
                  {
                      "internalType": "string",
                      "name": "symbol",
                      "type": "string"
                  },
                  {
                      "internalType": "int256",
                      "name": "indexPrice",
                      "type": "int256"
                  },
                  {
                      "internalType": "int256",
                      "name": "volatility",
                      "type": "int256"
                  }
              ],
              "internalType": "struct ISymbolsLens.PriceAndVolatility[]",
              "name": "pvs",
              "type": "tuple[]"
          }
      ],
      "name": "getSymbolsInfo",
      "outputs": [
          {
              "components": [
                  {
                      "internalType": "string",
                      "name": "category",
                      "type": "string"
                  },
                  {
                      "internalType": "string",
                      "name": "symbol",
                      "type": "string"
                  },
                  {
                      "internalType": "address",
                      "name": "symbolAddress",
                      "type": "address"
                  },
                  {
                      "internalType": "address",
                      "name": "implementation",
                      "type": "address"
                  },
                  {
                      "internalType": "address",
                      "name": "manager",
                      "type": "address"
                  },
                  {
                      "internalType": "address",
                      "name": "oracleManager",
                      "type": "address"
                  },
                  {
                      "internalType": "bytes32",
                      "name": "symbolId",
                      "type": "bytes32"
                  },
                  {
                      "internalType": "int256",
                      "name": "feeRatio",
                      "type": "int256"
                  },
                  {
                      "internalType": "int256",
                      "name": "alpha",
                      "type": "int256"
                  },
                  {
                      "internalType": "int256",
                      "name": "fundingPeriod",
                      "type": "int256"
                  },
                  {
                      "internalType": "int256",
                      "name": "minTradeVolume",
                      "type": "int256"
                  },
                  {
                      "internalType": "int256",
                      "name": "minInitialMarginRatio",
                      "type": "int256"
                  },
                  {
                      "internalType": "int256",
                      "name": "initialMarginRatio",
                      "type": "int256"
                  },
                  {
                      "internalType": "int256",
                      "name": "maintenanceMarginRatio",
                      "type": "int256"
                  },
                  {
                      "internalType": "int256",
                      "name": "pricePercentThreshold",
                      "type": "int256"
                  },
                  {
                      "internalType": "uint256",
                      "name": "timeThreshold",
                      "type": "uint256"
                  },
                  {
                      "internalType": "bool",
                      "name": "isCloseOnly",
                      "type": "bool"
                  },
                  {
                      "internalType": "bytes32",
                      "name": "priceId",
                      "type": "bytes32"
                  },
                  {
                      "internalType": "bytes32",
                      "name": "volatilityId",
                      "type": "bytes32"
                  },
                  {
                      "internalType": "int256",
                      "name": "feeRatioITM",
                      "type": "int256"
                  },
                  {
                      "internalType": "int256",
                      "name": "feeRatioOTM",
                      "type": "int256"
                  },
                  {
                      "internalType": "int256",
                      "name": "strikePrice",
                      "type": "int256"
                  },
                  {
                      "internalType": "bool",
                      "name": "isCall",
                      "type": "bool"
                  },
                  {
                      "internalType": "int256",
                      "name": "netVolume",
                      "type": "int256"
                  },
                  {
                      "internalType": "int256",
                      "name": "netCost",
                      "type": "int256"
                  },
                  {
                      "internalType": "int256",
                      "name": "indexPrice",
                      "type": "int256"
                  },
                  {
                      "internalType": "uint256",
                      "name": "fundingTimestamp",
                      "type": "uint256"
                  },
                  {
                      "internalType": "int256",
                      "name": "cumulativeFundingPerVolume",
                      "type": "int256"
                  },
                  {
                      "internalType": "int256",
                      "name": "tradersPnl",
                      "type": "int256"
                  },
                  {
                      "internalType": "int256",
                      "name": "initialMarginRequired",
                      "type": "int256"
                  },
                  {
                      "internalType": "uint256",
                      "name": "nPositionHolders",
                      "type": "uint256"
                  },
                  {
                      "internalType": "int256",
                      "name": "curIndexPrice",
                      "type": "int256"
                  },
                  {
                      "internalType": "int256",
                      "name": "curVolatility",
                      "type": "int256"
                  },
                  {
                      "internalType": "int256",
                      "name": "curCumulativeFundingPerVolume",
                      "type": "int256"
                  },
                  {
                      "internalType": "int256",
                      "name": "K",
                      "type": "int256"
                  },
                  {
                      "internalType": "int256",
                      "name": "markPrice",
                      "type": "int256"
                  },
                  {
                      "internalType": "int256",
                      "name": "funding",
                      "type": "int256"
                  },
                  {
                      "internalType": "int256",
                      "name": "timeValue",
                      "type": "int256"
                  },
                  {
                      "internalType": "int256",
                      "name": "delta",
                      "type": "int256"
                  },
                  {
                      "internalType": "int256",
                      "name": "u",
                      "type": "int256"
                  },
                  {
                      "internalType": "int256",
                      "name": "power",
                      "type": "int256"
                  },
                  {
                      "internalType": "int256",
                      "name": "hT",
                      "type": "int256"
                  },
                  {
                      "internalType": "int256",
                      "name": "powerPrice",
                      "type": "int256"
                  },
                  {
                      "internalType": "int256",
                      "name": "theoreticalPrice",
                      "type": "int256"
                  }
              ],
              "internalType": "struct ISymbolsLens.SymbolInfo[]",
              "name": "infos",
              "type": "tuple[]"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "pool_",
              "type": "address"
          },
          {
              "internalType": "address",
              "name": "account_",
              "type": "address"
          }
      ],
      "name": "getTdInfo",
      "outputs": [
          {
              "components": [
                  {
                      "internalType": "address",
                      "name": "account",
                      "type": "address"
                  },
                  {
                      "internalType": "uint256",
                      "name": "pTokenId",
                      "type": "uint256"
                  },
                  {
                      "internalType": "int256",
                      "name": "amountB0",
                      "type": "int256"
                  },
                  {
                      "components": [
                          {
                              "internalType": "address",
                              "name": "symbolAddress",
                              "type": "address"
                          },
                          {
                              "internalType": "string",
                              "name": "symbol",
                              "type": "string"
                          },
                          {
                              "internalType": "int256",
                              "name": "volume",
                              "type": "int256"
                          },
                          {
                              "internalType": "int256",
                              "name": "cost",
                              "type": "int256"
                          },
                          {
                              "internalType": "int256",
                              "name": "cumulativeFundingPerVolume",
                              "type": "int256"
                          },
                          {
                              "internalType": "int256",
                              "name": "margin",
                              "type": "int256"
                          },
                          {
                              "internalType": "int256",
                              "name": "marginUsed",
                              "type": "int256"
                          },
                          {
                              "internalType": "uint256",
                              "name": "vaultLiquidity",
                              "type": "uint256"
                          },
                          {
                              "internalType": "address",
                              "name": "vault",
                              "type": "address"
                          },
                          {
                              "internalType": "int256",
                              "name": "leverage",
                              "type": "int256"
                          },
                          {
                              "internalType": "int256",
                              "name": "liquidationPrice",
                              "type": "int256"
                          }
                      ],
                      "internalType": "struct DeriLens.PositionInfo[]",
                      "name": "positions",
                      "type": "tuple[]"
                  }
              ],
              "internalType": "struct DeriLens.TdInfo",
              "name": "info",
              "type": "tuple"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "pool_",
              "type": "address"
          },
          {
              "internalType": "address",
              "name": "account_",
              "type": "address"
          }
      ],
      "name": "getTokenInfo",
      "outputs": [
          {
              "components": [
                  {
                      "internalType": "address",
                      "name": "token",
                      "type": "address"
                  },
                  {
                      "internalType": "uint256",
                      "name": "price",
                      "type": "uint256"
                  },
                  {
                      "internalType": "uint256",
                      "name": "balance",
                      "type": "uint256"
                  },
                  {
                      "internalType": "string",
                      "name": "symbol",
                      "type": "string"
                  }
              ],
              "internalType": "struct DeriLens.TokenInfo[]",
              "name": "infos",
              "type": "tuple[]"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "nameId",
      "outputs": [
          {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "versionId",
      "outputs": [
          {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  }
]