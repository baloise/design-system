import { isNil, isNumber, isString, isDate, padStart } from 'lodash'

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
export function floorTime(date: Date) {
  let result = new Date(date)
  result.setHours(0, 0, 0, 0)
  return result
}

/**
 * Returns a JS Date instance with the time set to the possible end
 *
 * ```typescript
 * const date = ceilTime(new Date())
 * ```
 */
export function ceilTime(date: Date) {
  let result = new Date(date)
  result.setHours(23, 59, 59, 999)
  return result
}

/**
 * Returns the year number of the given date
 *
 * ```typescript
 * year(new Date(2020, 0, 1)) // 2020
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
 * month(new Date(2020, 0, 1)) // 0
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
 * day(new Date(2020, 0, 1)) // 1
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
 * increaseYear(new Date(2020, 0, 1), 1) // 2021
 * ```
 */
export function increaseYear(date: Date, years: number): number {
  return year(date) + years
}

/**
 * Decreases the year of a date and retunrs the result
 *
 * ```typescript
 * decreaseYear(new Date(2020, 0, 1), 1) // 2019
 * ```
 */
export function decreaseYear(date: Date, years: number): number {
  return year(date) - years
}

/**
 * Returns `true` when the given date is not smaller than the before date.
 *
 * ```typescript
 * isBefore(new Date(2020, 1, 1), new Date(2020, 3, 1)) // true
 * ```
 */
export function isBefore(date: any, beforeDate: Date | string | undefined): boolean {
  return validateTwoDates(date, beforeDate, (first, second) => first < second)
}

/**
 * Returns `true` when the given date is not smaller than the before date.
 *
 * ```typescript
 * isAfter(new Date(2020, 5, 1), new Date(2020, 3, 1)) // true
 * ```
 */
export function isAfter(date: any, afterDate: Date | string | undefined): boolean {
  return validateTwoDates(date, afterDate, (first, second) => first > second)
}

/**
 * Returns `true` when the given date is not smaller than the minDate and not bigger than the maxDate.
 *
 * ```typescript
 * isInRange(new Date(2020, 1, 1), new Date(2020, 0, 1), new Date(2020, 2, 1)) // true
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
 * format('2020-12-02') // '02.12.2020'
 * ```
 */
export function format(value: string | Date | undefined | null): string {
  if (isNil(value)) {
    return ''
  }

  if (isString(value)) {
    if (!isValidDateString(value)) {
      return ''
    }

    value = toDate(value)
  }

  if (!isDate(value)) {
    return ''
  }

  return `${pad(day(value))}.${pad(month(value) + 1)}.${year(value)}`
}

/**
 * Returns the ISO string `yyyy-mm-dd` of the given date
 *
 * ```typescript
 * isoString(new Date(2020, 0, 13)) // '2020-01-13'
 * ```
 */
export function isoString(date: Date | undefined): string {
  if (isNil(date) || Date.toString() === 'Invalid Date') {
    return ''
  }
  return `${year(date)}-${pad(month(date) + 1)}-${pad(day(date))}`
}

/**
 * Returns the ISO string `yyyy-mm-dd` of the given date
 *
 * ```typescript
 * newDateString(new Date(2020, 0, 13)) // '2020-01-13'
 * ```
 */
export function newDateString(date: Date): string
/**
 * Returns the ISO string `yyyy-mm-dd` of the given parameters year, month and day
 *
 * ```typescript
 * newDateString(2020, 0, 13) // '2020-01-13'
 * ```
 */
export function newDateString(year: number, month: number, day: number): string
export function newDateString(yearOrDate: Date | number, month?: number, day?: number): string {
  let date
  if (isDate(yearOrDate)) {
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
 * toDate('2020-01-13') // js date instance
 * ```
 */
export function toDate(datestring: string | undefined | null): Date | undefined {
  if (isNil(datestring)) {
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
      return undefined
    }

    if (month < 1 || month > 12) {
      return undefined
    }

    const lastDayOfMonth = new Date(year, month, 0).getDate()
    if (day < 1 || day > lastDayOfMonth) {
      return undefined
    }

    datestring = newDateString(year, month, day)
  }

  if (datestring === '' || datestring.length < 8 || datestring.length > 10) {
    return undefined
  }

  const date = new Date(datestring)

  if (date.toString() === 'Invalid Date') {
    return undefined
  }

  return date
}

/**
 * Returns `true` if the given datestring is valid
 *
 * ```typescript
 * isValidDateString('2020-01-13') //true
 * isValidDateString('2020-01-0') //false
 * isValidDateString('') //false
 * isValidDateString('1899-01-0') //false
 * ```
 */
export function isValidDateString(datestring: string | undefined | null): boolean {
  const date = toDate(datestring)
  if (isNil(date)) {
    return false
  }

  if (!isString(datestring)) {
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
  if (isNil(value)) {
    return false
  }
  if (isNumber(value)) {
    return false
  }
  if (isDate(value)) {
    return value.toString() !== 'Invalid Date'
  }

  return new Date(value).toString() !== 'Invalid Date'
}

function pad(value: number) {
  return padStart(`${value}`, 2, '0')
}

function validateTwoDates(first: any, second: Date | string | undefined, validateFn: (irst: Date, second: Date) => boolean) {
  if (isNil(first) && isNil(second)) {
    return false
  }

  const _first: Date = new Date(first as string | Date)
  const _second: Date = new Date(second as string | Date)

  if (!isValidDate(_first) || !isValidDate(_second)) {
    return false
  }

  return validateFn(_first, _second)
}
