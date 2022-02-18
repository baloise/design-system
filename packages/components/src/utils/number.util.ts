import { defaultLocale, useBalConfig } from '../config'
import * as BaloiseWebAppUtils from '@baloise/web-app-utils'

const getLocale = (): string => {
  const config = useBalConfig()
  return (config && config.locale) || defaultLocale
}

export const getDecimalSeparator = (): string => {
  return BaloiseWebAppUtils.getThousandSeparator(getLocale())
}

export const getThousandSeparator = (): string => {
  return BaloiseWebAppUtils.getThousandSeparator(getLocale())
}

export const formatLocaleNumber = (number: number, minimumFractionDigits?: number): string => {
  return BaloiseWebAppUtils.formatLocaleNumber(getLocale(), number, minimumFractionDigits)
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
