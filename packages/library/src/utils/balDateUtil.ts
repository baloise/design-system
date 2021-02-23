export const now = (): Date => new Date()

export const isValidDate = (value: any): boolean => {
  if (value === null || value === undefined) {
    return false
  }
  return new Date(value).toString() !== 'Invalid Date'
}

export const year = (date: Date | undefined): number => {
  if (date && isValidDate(date)) {
    return date.getFullYear()
  }
  throw new Error('Not a valid date')
}

export const month = (date: Date | undefined): number => {
  if (date && isValidDate(date)) {
    return date.getMonth()
  }
  throw new Error('Not a valid date')
}

export const day = (date: Date | undefined): number => {
  if (date && isValidDate(date)) {
    return date.getDate()
  }
  throw new Error('Not a valid date')
}

export const increaseYear = (date: Date, years: number): number => year(date) + years

export const decreaseYear = (date: Date, years: number): number => year(date) - years

export const isInRange = (date: Date | undefined, minDate: Date | undefined, maxDate: Date | undefined): boolean => {
  if (date && minDate && maxDate) {
    return minDate <= date && date <= maxDate
  }
  return true
}

export const padYear = (y: number | string) => {
  var s = `20${y}`
  return s.substr(s.length - 4)
}

export const pad = (value: number) => {
  var s = `0${value}`
  return s.substr(s.length - 2)
}

export const getLastDayOfMonth = (y: number, m: number): number => {
  const date = new Date(y, m + 1, 0)
  if (!isValidDate(date)) {
    return 0
  }
  return date.getDate()
}

export const getFirstDayOfTheWeek = (date: Date): Date => {
  const weekdayDiff = [6, 0, 1, 2, 3, 4, 5]
  const d = new Date(date)
  d.setDate(d.getDate() - weekdayDiff[d.getDay()])
  return d
}

export const isSameYear = (a: Date, b: Date): boolean => {
  return a.getFullYear() === b.getFullYear()
}

export const isSameMonth = (a: Date, b: Date): boolean => {
  return isSameYear(a, b) && a.getMonth() === b.getMonth()
}

export const isSameDay = (a: Date, b: Date): boolean => {
  return isSameMonth(a, b) && a.getDate() === b.getDate()
}

export const isSameWeek = (a: Date, b: Date): boolean => {
  return isSameDay(getFirstDayOfTheWeek(a), getFirstDayOfTheWeek(b))
}

export const format = (datestring: string | undefined | null): string => {
  if (!isValidDateString(datestring)) {
    return ''
  }

  const date = toDate(datestring)
  return `${pad(day(date))}.${pad(month(date) + 1)}.${year(date)}`
}

export const isoString = (date: Date | undefined): string => {
  if (date === undefined || date === null || Date.toString() === 'Invalid Date') {
    return ''
  }
  return `${year(date)}-${pad(month(date) + 1)}-${pad(day(date))}`
}

export function newDateString(date: Date): string
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

export const localDatetime = (date: Date): Date => {
  return new Date(Date.UTC(date.getFullYear(), date.getMonth() - 1, date.getDate()))
}

export const toDate = (datestring: string | undefined | null): Date | undefined => {
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

export const isValidDateString = (datestring: string | undefined | null): boolean => {
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
