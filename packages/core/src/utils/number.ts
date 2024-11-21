import { defaultLocale, useBalConfig } from './config'

const getLocale = (): string => {
  const config = useBalConfig()
  return (config && config.locale) || defaultLocale
}

export function getDecimalSeparator(): string {
  return Intl.NumberFormat(getLocale())
    .format(1.1)
    .replace(/\p{Number}/gu, '')
}

export const getDecimalSeparators = (): string[] => {
  if (getThousandSeparator() !== '.') {
    return [getDecimalSeparator(), '.']
  }

  return [getDecimalSeparator()]
}

export function getThousandSeparator(): string {
  return Intl.NumberFormat(getLocale())
    .format(11111)
    .replace(/\p{Number}/gu, '')
}

export function formatLocaleNumber(number: number, minimumFractionDigits?: number): string {
  const options =
    minimumFractionDigits !== undefined ? { minimumFractionDigits, maximumFractionDigits: minimumFractionDigits } : {}
  const formattedNumber = Intl.NumberFormat(getLocale(), {
    ...options,
  }).format(number)

  if (formattedNumber === 'NaN') {
    return ''
  }

  return formattedNumber
}

export const parseLocaleNumber = (stringNumber: string): number => {
  const thousandSeparator = getThousandSeparator()
  const decimalSeparator = getDecimalSeparator()

  return parseFloat(
    stringNumber
      .replace(new RegExp('\\' + thousandSeparator, 'g'), '')
      .replace(new RegExp('\\' + decimalSeparator), '.'),
  )
}

export const getNegativeSymbol = (): string => {
  return '-'
}

export const parseFloatString = (value: string): string => {
  return value.replace(getDecimalSeparator(), '.')
}

export const formatFloatString = (value: string): string => {
  return value.replace('.', getDecimalSeparator())
}
