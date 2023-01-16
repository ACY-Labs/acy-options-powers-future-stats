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
    pool: '0xFd940a610A820b2e72Fd6cAaC4F903646d8906f3',
    reader: "0x9F65B4f4f5B3A0Cb4f5FF693838F0Dd3a9933415",
  },
}

export const httpProvider = {
  80001: "https://rpc-mumbai.maticvigil.com",
}