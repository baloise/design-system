import { localstring } from './local.util'

export const getDecimalSeperator = (): string => {
  return Intl.NumberFormat(localstring())
    .format(1.1)
    .replace(/\p{Number}/gu, '')
}

export const getThousandSeparator = (): string => {
  return Intl.NumberFormat(localstring())
    .format(11111)
    .replace(/\p{Number}/gu, '')
}

export const formatLocaleNumber = (number: number, minimumFractionDigits?: number): string => {
  const options = minimumFractionDigits !== undefined ? { minimumFractionDigits } : {}
  return Intl.NumberFormat(localstring(), {
    ...options,
  }).format(number)
}

export const parseLocaleNumber = (stringNumber: string): number => {
  const thousandSeparator = getThousandSeparator()
  const decimalSeparator = getDecimalSeperator()

  return parseFloat(
    stringNumber
      .replace(new RegExp('\\' + thousandSeparator, 'g'), '')
      .replace(new RegExp('\\' + decimalSeparator), '.'),
  )
}
