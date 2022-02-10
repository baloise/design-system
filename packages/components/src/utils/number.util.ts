import { defaultLocale, useBalConfig } from '../config'

export const getDecimalSeparator = (): string => {
  const config = useBalConfig()
  return Intl.NumberFormat((config && config.locale) || defaultLocale)
    .format(1.1)
    .replace(/\p{Number}/gu, '')
}

export const getThousandSeparator = (): string => {
  const config = useBalConfig()
  return Intl.NumberFormat((config && config.locale) || defaultLocale)
    .format(11111)
    .replace(/\p{Number}/gu, '')
}

export const formatLocaleNumber = (number: number, minimumFractionDigits?: number): string => {
  const config = useBalConfig()
  const options = minimumFractionDigits !== undefined ? { minimumFractionDigits } : {}
  return Intl.NumberFormat((config && config.locale) || defaultLocale, {
    ...options,
  }).format(number)
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
