import {
  formatISO,
  parse as dateFnsParse,
  isMatch,
  isValid,
  parseISO,
  getYear,
  setYear,
  getMonth,
  getDate,
} from 'date-fns'
import padStart from 'lodash.padstart'

export const ISO_PATTERN = 'yyyy-MM-dd'
export const DATE_PATTERN = 'dd-MM-yyyy'
export const TIMEZONE = 'T00:00:00.000Z'

/**
 * Returns a JS Date instance of the exact moment
 *
 * ```typescript
 * const date = now()
 * // Wed Mar 10 2021 20:30:32 GMT+0100 (Central European Standard Time)
 * ```
 */
export function now(): Date {
  return new Date()
}

/**
 * Returns a JS Date instance of today with time being set to 0
 *
 * ```typescript
 * const date = today()
 * // Wed Mar 10 2021 00:00:00 GMT+0100 (Central European Standard Time)
 * ```
 */
export function today(): Date {
  return floorTime(now())
}

/**
 * Returns a JS Date instance with time being set to 0
 *
 * ```typescript
 * const date = floorTime(new Date())
 * // Wed Mar 10 2021 00:00:00 GMT+0100 (Central European Standard Time)
 * ```
 */
export function floorTime(date: Date): Date {
  const result = new Date(date)
  result.setHours(0, 0, 0, 0)
  return result
}

// /**
//  * Returns a JS Date instance with the time set to the possible end
//  *
//  * ```typescript
//  * const date = ceilTime(new Date())
//  * // Wed Mar 10 2021 23:59:59 GMT+0100 (Central European Standard Time)
//  * ```
//  */
// export function ceilTime(date: Date): Date {
//   const result = new Date(date)
//   result.setHours(23, 59, 59, 999)
//   return result
// }

/**
 * Return the formatted date string in ISO 8601 format. Options may be passed to control the parts and notations of the date.
 *
 * ```typescript
 * const dateString = formatDateString(new Date())
 * // '2022-02-14'
 * ```
 */
export function formatDateString(date: Date): string {
  return date && isValid(date) ? formatISO(date, { representation: 'date' }) : ''
}

/**
 * Validates if the given date string matches the iso date format.
 *
 * ```typescript
 * isValidIsoString('2022-02-14')
 * // 'true'
 * ```
 */
export function isValidIsoString(dateString: string | undefined | null) {
  return !!dateString ? isMatch(dateString, ISO_PATTERN) : false
}

/**
 * Formats the dates according to the given locale.
 *
 * ```typescript
 * format('de-CH', new Date())
 * // '14.2.2022'
 * ```
 */
export function format(locale = 'de-CH', date?: Date) {
  return isValid(date) ? intlFormat(dateLocale(locale), date as Date) : ''
}

/**
 * Parses the iso date string into a javascript date object.
 *
 * ```typescript
 * const dateString = parse('2021-03-10')
 * // Wed Mar 10 2021 00:00:00 GMT+0100 (Central European Standard Time)
 * ```
 */
export function parse(dateString: string, locale = 'de-CH'): Date | undefined {
  if (isMatch(dateString, ISO_PATTERN)) {
    const d = parseISO(dateString + TIMEZONE)
    if (d && isValid(d)) {
      return validateYear(d)
    }
    const [year, month, day] = `${dateString}`.split('-').map(d => parseInt(d, 10))
    return generateIsoDate([year, month, day])
  }

  if (isMatch(dateString, getDatePattern(locale))) {
    const d = dateFnsParse(dateString, getDatePattern(locale), now())
    return generateIsoDate([getYear(d), getMonth(d) + 1, getDate(d)])
  }

  return undefined
}

/**
 * Returns the char which separates day form month and year.
 *
 * ```typescript
 * dateSeparator('de-CH')
 * // .
 * ```
 */
export function dateSeparator(locale = 'de-CH'): string {
  return new Intl.DateTimeFormat(dateLocale(locale))
    .format(now())
    .replace(/\p{Number}/gu, '')
    .charAt(0)
}

/**************************************************************
 * PRIVATE
 **************************************************************/

function getDatePattern(locale = 'de-CH') {
  return DATE_PATTERN.split('-').join(dateSeparator(locale))
}

function intlFormat(locale = 'de-CH', date: Date): string {
  const intl = new Intl.DateTimeFormat(dateLocale(locale))
  return intl.format(date)
}

function pad(value: number) {
  return padStart(`${value}`, 2, '0')
}

function validateYear(date: Date): Date | undefined {
  if (date && isValid(date)) {
    if (getYear(date) < 1000) {
      return setYear(date, getYear(date) + 2000)
    }
    return date
  }
  return undefined
}

function generateIsoDate([year, month, day]: [number, number, number]): Date | undefined {
  if (year > 0 && month > 0 && day > 0) {
    return parseISO(`${year < 1000 ? year + 2000 : year}-${pad(month)}-${pad(day)}` + TIMEZONE)
  }
  return undefined
}

function dateLocale(locale = 'de-CH'): string {
  const [, region] = locale.split('-')
  if (region === 'CH') {
    return 'fr-CH'
  }
  if (region === 'BE') {
    return 'fr-BE'
  }
  if (region === 'LU') {
    return 'fr-LU'
  }
  return locale
}
