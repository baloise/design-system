import { defaultConfig, useBalConfig } from '../config'

export const getDecimalSeperator = (): string => {
  const config = useBalConfig()
  return Intl.NumberFormat((config && config.locale) || defaultConfig.language)
    .format(1.1)
    .replace(/\p{Number}/gu, '')
}

export const getThousandSeparator = (): string => {
  const config = useBalConfig()
  return Intl.NumberFormat((config && config.locale) || defaultConfig.language)
    .format(11111)
    .replace(/\p{Number}/gu, '')
}

export const formatLocaleNumber = (number: number, minimumFractionDigits?: number): string => {
  const config = useBalConfig()
  const options = minimumFractionDigits !== undefined ? { minimumFractionDigits } : {}
  return Intl.NumberFormat((config && config.locale) || defaultConfig.language, {
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
