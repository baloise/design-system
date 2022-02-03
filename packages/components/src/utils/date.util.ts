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
import { useBalConfig } from '../config'

export const ISO_PATTERN = 'yyyy-MM-dd'
export const DATE_PATTERN = 'dd-MM-yyyy'
export const TIMEZONE = 'T00:00:00.000Z'

export const now = () => new Date()

export const isoString = (date: Date): string => {
  return date && isValid(date) ? formatISO(date, { representation: 'date' }) : ''
}

export const isValidIsoString = (datestring: string | undefined | null) =>
  !!datestring ? isMatch(datestring, ISO_PATTERN) : false

function intlFormat(date: Date): string {
  const config = useBalConfig()
  const intl = new Intl.DateTimeFormat((config && config.locale) || 'de-CH')
  return intl.format(date)
}

export const format = (date?: Date) => {
  return isValid(date) ? intlFormat(date as Date) : ''
}

export const parse = (datestring: string): Date | undefined => {
  if (isMatch(datestring, ISO_PATTERN)) {
    const d = parseISO(datestring + TIMEZONE)
    if (d && isValid(d)) {
      return validateYear(d)
    }
    const [year, month, day] = `${datestring}`.split('-').map(d => parseInt(d, 10))
    return generateIsoDate([year, month, day])
  }

  if (isMatch(datestring, getDatePattern())) {
    const d = dateFnsParse(datestring, getDatePattern(), now())
    return generateIsoDate([getYear(d), getMonth(d) + 1, getDate(d)])
  }

  return
}

export const getDatePattern = () => {
  return DATE_PATTERN.split('-').join(getDateSeperator())
}

export const getDateSeperator = (): string => {
  const config = useBalConfig()
  return new Intl.DateTimeFormat((config && config.locale) || 'de-CH')
    .format(now())
    .replace(/\p{Number}/gu, '')
    .charAt(0)
}

/**************************************************************
 * PRIVATE
 **************************************************************/

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
  return
}

function generateIsoDate([year, month, day]: [number, number, number]): Date | undefined {
  if (year > 0 && month > 0 && day > 0) {
    return parseISO(`${year < 1000 ? year + 2000 : year}-${pad(month)}-${pad(day)}` + TIMEZONE)
  }
  return
}
