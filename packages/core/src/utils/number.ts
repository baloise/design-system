// de-CH mirrors the default locale in global/config/config.default.ts.
// Reads the live config directly off `window` instead of importing `useDsConfig` from '@global',
// which would pull in a module cycle (see the same workaround in ./helpers.ts).
const DEFAULT_LOCALE = 'de-CH'

const getDsConfig = (): { locale?: string } | undefined => {
  const win = window as any
  return win && win.DesignSystem && win.DesignSystem.config
}

const getLocale = (): string => {
  const config = getDsConfig()
  // workaround for swiss french locale which uses non standard number formatting
  if (config && config.locale && config.locale === 'fr-CH') {
    return DEFAULT_LOCALE
  }
  return (config && config.locale) || DEFAULT_LOCALE
}

export function getDecimalSeparator(): string {
  return Intl.NumberFormat(getLocale())
    .format(1.1)
    .replace(/\p{Number}/gu, '')
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
