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
    pool: '0x5C842b8E75D4fC8C63f2F889d7f067aa72b8C65C',
    reader: "0x99E4B9F0664c700F871C53630572B08D74a6f5B5",
  },
}

export const httpProvider = {
  80001: "https://rpc-mumbai.maticvigil.com",
}