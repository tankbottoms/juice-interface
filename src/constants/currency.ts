import { CSSProperties } from 'react'

export type CurrencyName = 'MATIC' | 'USD'
export type CurrencySymbol = 'MATIC' | 'US$'
export type CurrencyMetadata = {
  name: CurrencyName
  symbol: CurrencySymbol
  style?: CSSProperties
}

export const CURRENCY_METADATA: Record<CurrencyName, CurrencyMetadata> = {
  MATIC: {
    name: 'MATIC',
    symbol: 'MATIC',
    style: {
      fontFamily: 'sans-serif',
    },
  },
  USD: {
    name: 'USD',
    symbol: 'US$',
  },
}
