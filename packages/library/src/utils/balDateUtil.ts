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

export const isoString = (value: Date | undefined): string => {
  if (value === undefined) {
    return ''
  }
  return value.toISOString()
}

export const localDatetime = (date: Date): Date => {
  return new Date(Date.UTC(date.getFullYear(), date.getMonth() - 1, date.getDate()))
}

export const toDate = (datestring: string | undefined | null): Date | undefined => {
  if (datestring === undefined || datestring === null) {
    return undefined
  }

  if (datestring.length >= 8 && datestring.length <= 10) {
    const parts = datestring.split('.')
    const date = new Date(parseInt(parts[2], 10), parseInt(parts[1], 10), parseInt(parts[0], 10))
    const localDateTime = localDatetime(date)
    datestring = localDateTime.toISOString()
  }

  if (!isValidDateString(datestring)) {
    return undefined
  }

  return new Date(datestring)
}

export const isValidDateString = (datestring: string | undefined | null): boolean => {
  if (datestring === undefined || datestring === null) {
    return false
  }

  if (datestring.length < 24 || datestring.length > 27) {
    return false
  }

  const date = new Date(datestring)
  if (date.toString() === 'Invalid Date') {
    return false
  }

  if (date.getFullYear() < 1900) {
    return false
  }

  return true
}

/**
 * Converts a valid UTC datetime string to JS Date time object.
 * By default uses the users local timezone, but an optional
 * timezone can be provided.
 * Note: This is not meant for time strings
 * such as "01:47"
 */
// export const parseDate = (value: any = '', timeZone: any = ''): Date | undefined => {
//   if (!isValidDateString(value)) {
//     return undefined
//   }

//   const d = unformat(value)
//   const date = new Date(d.year, d.month, d.day)
//   const localDateTime = new Date(Date.UTC(date.getFullYear(), date.getMonth() - 1, date.getDate()))

//   if (timeZone && timeZone.length > 0) {
//     return new Date(date.getTime() - getTimezoneOffset(localDateTime, timeZone))
//   }

//   return localDateTime
// }

// export const getTimezoneOffset = (localDate: Date, timeZone: string) => {
//   const utcDateTime = new Date(localDate.toLocaleString('en-US', { timeZone: 'utc' }))
//   const tzDateTime = new Date(localDate.toLocaleString('en-US', { timeZone }))
//   return utcDateTime.getTime() - tzDateTime.getTime()
// }
