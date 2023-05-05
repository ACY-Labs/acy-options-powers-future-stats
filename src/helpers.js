import Logger from 'console-log-level'
import chalk from 'chalk'


const levelColor = {
  'debug': 'grey',
  'error': 'red',
  'warn': 'orange',
  'info': 'greenBright'
}

export function getLogger(ns) {
    return Logger({
      level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
      prefix: level => {
        const prefix = `[${ns}] ${level.toUpperCase()}`
        return (chalk[levelColor[level]] || chalk.white)(prefix)
      }
    })
}

export const contracts = {
  80001: {
    pool: '0xA6177E34ab046007b75e887569108aa7809EE50F',
    reader: "0xb3565532BB41e646970D6EDdCf869EAe1A767736",
  },
}

export const httpProvider = {
  80001: "https://rpc-mumbai.maticvigil.com",
}