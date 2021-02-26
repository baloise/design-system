/**
 * Returns a JS Date instance of today
 *
 * ```typescript
 * const date = balDateUtil.now()
 * ```
 */
export function now(): Date {
  return new Date()
}

function isValidDate(value: any): boolean {
  if (value === null || value === undefined) {
    return false
  }
  return new Date(value).toString() !== 'Invalid Date'
}

/**
 * Returns the year number of the given date
 *
 * ```typescript
 * balDateUtil.year(new Date(2020, 0, 1)) // 2020
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
 * balDateUtil.month(new Date(2020, 0, 1)) // 0
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
 * balDateUtil.day(new Date(2020, 0, 1)) // 1
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
 * balDateUtil.increaseYear(new Date(2020, 0, 1), 1) // 2021
 * ```
 */
export function increaseYear(date: Date, years: number): number {
  return year(date) + years
}

/**
 * Decreases the year of a date and retunrs the result
 *
 * ```typescript
 * balDateUtil.decreaseYear(new Date(2020, 0, 1), 1) // 2019
 * ```
 */
export function decreaseYear(date: Date, years: number): number {
  return year(date) - years
}

/**
 * Returns `true` when the given date is not smaller than the minDate and not bigger than the maxDate.
 *
 * ```typescript
 * balDateUtil.isInRange(new Date(2020, 1, 1), new Date(2020, 0, 1), new Date(2020, 2, 1)) // true
 * ```
 */
export function isInRange(date: Date | undefined, minDate: Date | undefined, maxDate: Date | undefined): boolean {
  if (date && minDate && maxDate) {
    return minDate <= date && date <= maxDate
  }
  return true
}

function pad(value: number) {
  var s = `0${value}`
  return s.substr(s.length - 2)
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
 * balDateUtil.format('2020-12-02') // '02.12.2020'
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
 * balDateUtil.isoString(new Date(2020, 0, 13)) // '2020-01-13'
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
 * balDateUtil.newDateString(new Date(2020, 0, 13)) // '2020-01-13'
 * ```
 */
export function newDateString(date: Date): string
/**
 * Returns the ISO string `yyyy-mm-dd` of the given parameters year, month and day
 *
 * ```typescript
 * balDateUtil.newDateString(2020, 0, 13) // '2020-01-13'
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
 * balDateUtil.toDate('2020-01-13') // js date instance
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
 * balDateUtil.isValidDateString('2020-01-13') //true
 * balDateUtil.isValidDateString('2020-01-0') //false
 * balDateUtil.isValidDateString('') //false
 * balDateUtil.isValidDateString('1899-01-0') //false
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
