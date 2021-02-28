import { isDefined, isNumber } from './balUtil'

/**
 * Returns a JS Date instance of today
 *
 * ```typescript
 * const date = BalDateUtil.now()
 * ```
 */
export function now(): Date {
  return new Date()
}

/**
 * Returns the year number of the given date
 *
 * ```typescript
 * BalDateUtil.year(new Date(2020, 0, 1)) // 2020
 * ```
 */
export function year(date: Date | undefined): number {
  if (date && isValidDate(date)) {
    return date.getFullYear()
  }
  throw new Error('Not a valid date')
}

/**
 * Returns the month number of the given date
 *
 * ```typescript
 * BalDateUtil.month(new Date(2020, 0, 1)) // 0
 * ```
 */
export function month(date: Date | undefined): number {
  if (date && isValidDate(date)) {
    return date.getMonth()
  }
  throw new Error('Not a valid date')
}

/**
 * Returns the day number of the given date
 *
 * ```typescript
 * BalDateUtil.day(new Date(2020, 0, 1)) // 1
 * ```
 */
export function day(date: Date | undefined): number {
  if (date && isValidDate(date)) {
    return date.getDate()
  }
  throw new Error('Not a valid date')
}

/**
 * Increases the year of a date and retunrs the result
 *
 * ```typescript
 * BalDateUtil.increaseYear(new Date(2020, 0, 1), 1) // 2021
 * ```
 */
export function increaseYear(date: Date, years: number): number {
  return year(date) + years
}

/**
 * Decreases the year of a date and retunrs the result
 *
 * ```typescript
 * BalDateUtil.decreaseYear(new Date(2020, 0, 1), 1) // 2019
 * ```
 */
export function decreaseYear(date: Date, years: number): number {
  return year(date) - years
}

/**
 * Returns `true` when the given date is not smaller than the before date.
 *
 * ```typescript
 * BalDateUtil.isBefore(new Date(2020, 1, 1), new Date(2020, 3, 1)) // true
 * ```
 */
export function isBefore(date: any, beforeDate: Date | string | undefined): boolean {
  return validateTwoDates(date, beforeDate, (first, second) => first < second)
}

/**
 * Returns `true` when the given date is not smaller than the before date.
 *
 * ```typescript
 * BalDateUtil.isAfter(new Date(2020, 5, 1), new Date(2020, 3, 1)) // true
 * ```
 */
export function isAfter(date: any, afterDate: Date | string | undefined): boolean {
  return validateTwoDates(date, afterDate, (first, second) => first > second)
}

/**
 * Returns `true` when the given date is not smaller than the minDate and not bigger than the maxDate.
 *
 * ```typescript
 * BalDateUtil.isInRange(new Date(2020, 1, 1), new Date(2020, 0, 1), new Date(2020, 2, 1)) // true
 * ```
 */
export function isInRange(date: Date | undefined, minDate: Date | undefined, maxDate: Date | undefined): boolean {
  if (date && minDate && maxDate) {
    return minDate <= date && date <= maxDate
  }
  return true
}

/**
 * Returns the first day of the week of the given date.
 */
export function getFirstDayOfTheWeek(date: Date): Date {
  const weekdayDiff = [6, 0, 1, 2, 3, 4, 5]
  const d = new Date(date)
  d.setDate(d.getDate() - weekdayDiff[d.getDay()])
  return d
}

/**
 * Returns `true` when the year of the dates are the same
 */
export function isSameYear(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear()
}

/**
 * Returns `true` when the month of the dates are the same
 */
export function isSameMonth(a: Date, b: Date): boolean {
  return isSameYear(a, b) && a.getMonth() === b.getMonth()
}

/**
 * Returns `true` when the day of the dates are the same
 */
export function isSameDay(a: Date, b: Date): boolean {
  return isSameMonth(a, b) && a.getDate() === b.getDate()
}

/**
 * Returns `true` when the week of the dates are the same
 */
export function isSameWeek(a: Date, b: Date): boolean {
  return isSameDay(getFirstDayOfTheWeek(a), getFirstDayOfTheWeek(b))
}

/**
 * Transforms the ISO datestring into `dd.mm.yyyy`
 *
 * ```typescript
 * BalDateUtil.format('2020-12-02') // '02.12.2020'
 * ```
 */
export function format(datestring: string | undefined | null): string {
  if (!isValidDateString(datestring)) {
    return ''
  }

  const date = toDate(datestring)
  return `${pad(day(date))}.${pad(month(date) + 1)}.${year(date)}`
}

/**
 * Returns the ISO string `yyyy-mm-dd` of the given date
 *
 * ```typescript
 * BalDateUtil.isoString(new Date(2020, 0, 13)) // '2020-01-13'
 * ```
 */
export function isoString(date: Date | undefined): string {
  if (date === undefined || date === null || Date.toString() === 'Invalid Date') {
    return ''
  }
  return `${year(date)}-${pad(month(date) + 1)}-${pad(day(date))}`
}

/**
 * Returns the ISO string `yyyy-mm-dd` of the given date
 *
 * ```typescript
 * BalDateUtil.newDateString(new Date(2020, 0, 13)) // '2020-01-13'
 * ```
 */
export function newDateString(date: Date): string
/**
 * Returns the ISO string `yyyy-mm-dd` of the given parameters year, month and day
 *
 * ```typescript
 * BalDateUtil.newDateString(2020, 0, 13) // '2020-01-13'
 * ```
 */
export function newDateString(year: number, month: number, day: number): string
export function newDateString(yearOrDate: Date | number, month?: number, day?: number): string {
  let date
  if (yearOrDate instanceof Date) {
    date = localDatetime(yearOrDate)
  } else {
    date = new Date(Date.UTC(yearOrDate, (month as number) - 1, day as number))
  }
  return isoString(date)
}

function localDatetime(date: Date): Date {
  return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
}

/**
 * Turns the ISO string `yyyy-mm-dd` it a JS Date instance
 *
 * ```typescript
 * BalDateUtil.toDate('2020-01-13') // js date instance
 * ```
 */
export function toDate(datestring: string | undefined | null): Date | undefined {
  if (datestring === undefined || datestring === null) {
    return undefined
  }

  if (datestring.length >= 8 && datestring.length <= 10 && (datestring.indexOf('-') >= 0 || datestring.indexOf('.') >= 0)) {
    const isIso = datestring.indexOf('-') >= 0
    const seperator = isIso ? '-' : '.'
    const parts = datestring.split(seperator)
    const year = parseInt(isIso ? parts[0] : parts[2], 10)
    const month = parseInt(parts[1], 10)
    const day = parseInt(isIso ? parts[2] : parts[0], 10)

    if (year < 1900) {
      return
    }

    if (month < 1 || month > 12) {
      return
    }

    const lastDayOfMonth = new Date(year, month, 0).getDate()
    if (day < 1 || day > lastDayOfMonth) {
      return
    }

    datestring = newDateString(year, month, day)
  }

  if (datestring === '' || datestring.length < 8 || datestring.length > 10) {
    return
  }

  const date = new Date(datestring)

  if (date.toString() === 'Invalid Date') {
    return
  }

  return date
}

/**
 * Returns `true` if the given datestring is valid
 *
 * ```typescript
 * BalDateUtil.isValidDateString('2020-01-13') //true
 * BalDateUtil.isValidDateString('2020-01-0') //false
 * BalDateUtil.isValidDateString('') //false
 * BalDateUtil.isValidDateString('1899-01-0') //false
 * ```
 */
export function isValidDateString(datestring: string | undefined | null): boolean {
  const date = toDate(datestring)
  if (date === undefined) {
    return false
  }

  if (typeof datestring !== 'string') {
    return false
  }

  if (datestring && datestring.indexOf('-') === -1) {
    return false
  }

  if (date.toString() === 'Invalid Date') {
    return false
  }

  if (date.getFullYear() < 1900) {
    return false
  }

  return true
}

/**
 * Returns `true` if the given date is valid
 */
export function isValidDate(value: any): boolean {
  if (!isDefined(value)) {
    return false
  }
  if (isNumber(value)) {
    return false
  }
  if (value instanceof Date) {
    return value.toString() !== 'Invalid Date'
  }

  return new Date(value).toString() !== 'Invalid Date'
}

function pad(value: number) {
  var s = `0${value}`
  return s.substr(s.length - 2)
}

function validateTwoDates(first: any, second: Date | string | undefined, validateFn: (irst: Date, second: Date) => boolean) {
  if (!isDefined(first) && !isDefined(second)) {
    return false
  }

  const _first: Date = new Date(first as string | Date)
  const _second: Date = new Date(second as string | Date)

  if (!isValidDate(_first) || !isValidDate(_second)) {
    return false
  }

  return validateFn(_first, _second)
}
