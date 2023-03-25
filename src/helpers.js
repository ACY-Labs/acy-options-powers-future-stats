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
    pool: '0x285dc02bC51f2fabCE08F9625B44802019583286',
    reader: "0xb4C9d67c91D7c6ded1A8e92912D2FD71b48167b5",
  },
}

export const httpProvider = {
  80001: "https://rpc-mumbai.maticvigil.com",
}