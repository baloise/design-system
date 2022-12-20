import { defaultLocale, useBalConfig } from './config'
import {
  getDecimalSeparator as getDecimalSeparatorUtil,
  getThousandSeparator as getThousandSeparatorUtil,
  formatLocaleNumber as formatLocaleNumberUtil,
} from '@baloise/web-app-utils'

const getLocale = (): string => {
  const config = useBalConfig()
  return (config && config.locale) || defaultLocale
}

export const getDecimalSeparator = (): string => {
  return getDecimalSeparatorUtil(getLocale())
}

export const getThousandSeparator = (): string => {
  return getThousandSeparatorUtil(getLocale())
}

export const formatLocaleNumber = (number: number, minimumFractionDigits?: number): string => {
  return formatLocaleNumberUtil(getLocale(), number, minimumFractionDigits)
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

export const parseFloatString = (value: string): string => {
  return value.replace(getDecimalSeparator(), '.')
}

export const formatFloatString = (value: string): string => {
  return value.replace('.', getDecimalSeparator())
}
