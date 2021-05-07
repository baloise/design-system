import {
  toDate,
  format,
  isValidDateString,
  newDateString,
  isoString,
  year,
  day,
  month,
  getFirstDayOfTheWeek,
  increaseYear,
  decreaseYear,
  isInRange,
  isSameYear,
  isSameMonth,
  isSameDay,
  isSameWeek,
  isBefore,
  isAfter,
} from './balDateUtil'

describe('parseDate', () => {
  describe('isoString', () => {
    test('should turn a date into a iso date string', () => {
      expect(isoString(undefined)).toBe('')
      expect(isoString(new Date(2022, 0, 1))).toBe('2022-01-01')
      expect(isoString(new Date(2022, 11, 31))).toBe('2022-12-31')
    })
  })

  describe('newDateString', () => {
    test('should return a iso-date-string', () => {
      expect(newDateString(2033, 3, 2)).toBe('2033-03-02')
      expect(newDateString(new Date(2022, 1, 1))).toBe('2022-02-01')
    })
  })

  describe('toDate', () => {
    test('should turn datestrings into js dates', () => {
      expect(toDate('07.12.2000')?.toISOString()).toBe('2000-12-07T00:00:00.000Z')
      expect(toDate('2000-12-07')?.toISOString()).toBe('2000-12-07T00:00:00.000Z')
      expect(toDate('')).toBe(undefined)
      expect(toDate(undefined)).toBe(undefined)
      expect(toDate(null)).toBe(undefined)
    })
  })

  describe('format', () => {
    test('should format iso dates into our ui format', () => {
      expect(format('1988-02-07')).toBe('07.02.1988')
      expect(format('1988-02-07T00:00:00.000Z')).toBe('')
      expect(format('07.02.1988')).toBe('')
      expect(format('')).toBe('')
      expect(format(undefined)).toBe('')
      expect(format(null)).toBe('')
    })
  })

  describe('isValidDateString', () => {
    test('should tell if the iso date string is valid', () => {
      expect(isValidDateString('1900-01-01')).toBe(true)
      expect(isValidDateString('01.01.1900')).toBe(false)
      expect(isValidDateString('1900.01.01')).toBe(false)
      expect(isValidDateString('1899-02-07')).toBe(false)
      expect(isValidDateString('1999-13-07')).toBe(false)
      expect(isValidDateString('1999-00-32')).toBe(false)
      expect(isValidDateString('1999-01-00')).toBe(false)
      expect(isValidDateString('1999-01-32')).toBe(false)
      expect(isValidDateString('')).toBe(false)
      expect(isValidDateString(undefined)).toBe(false)
    })
  })

  describe('isBefore & isAfter', () => {
    test('isBefore', () => {
      expect(isBefore(new Date(2020, 0, 1), new Date(2020, 0, 2))).toBe(true)
      expect(isBefore('2000-01-01', '2000-01-02')).toBe(true)
      expect(isBefore('2000-01-01', '2000-01-01')).toBe(false)
    })
    test('isAfter', () => {
      expect(isAfter(new Date(2020, 0, 2), new Date(2020, 0, 1))).toBe(true)
      expect(isAfter('2000-01-02', '2000-01-01')).toBe(true)
      expect(isAfter('2000-01-01', '2000-01-01')).toBe(false)
    })
  })

  describe('year', () => {
    test('should return year', () => {
      expect(year(new Date(2020, 0, 1))).toBe(2020)
      expect(() => year(undefined)).toThrow(Error)
      expect(() => year(new Date('adsf'))).toThrow(Error)
    })
  })

  describe('month', () => {
    test('should return month', () => {
      expect(month(new Date(2020, 0, 1))).toBe(0)
      expect(() => month(undefined)).toThrow(Error)
      expect(() => month(new Date('adsf'))).toThrow(Error)
    })
  })

  describe('day', () => {
    test('should return day', () => {
      expect(day(new Date(2020, 0, 1))).toBe(1)
      expect(() => day(undefined)).toThrow(Error)
      expect(() => day(new Date('adsf'))).toThrow(Error)
    })
  })

  describe('increas & decrease year', () => {
    test('should increas & decrease year', () => {
      expect(increaseYear(new Date(2020, 0, 1), 1)).toBe(2021)
      expect(decreaseYear(new Date(2020, 0, 1), 1)).toBe(2019)
    })
  })

  describe('isInRange', () => {
    test('should verify if the date is in range', () => {
      expect(isInRange(new Date(2020, 0, 4), new Date(2020, 0, 5), new Date(2020, 0, 10))).toBe(false)
      expect(isInRange(new Date(2020, 0, 5), new Date(2020, 0, 5), new Date(2020, 0, 10))).toBe(true)
      expect(isInRange(new Date(2020, 0, 6), new Date(2020, 0, 5), new Date(2020, 0, 10))).toBe(true)
      expect(isInRange(new Date(2020, 0, 9), new Date(2020, 0, 5), new Date(2020, 0, 10))).toBe(true)
      expect(isInRange(new Date(2020, 0, 10), new Date(2020, 0, 5), new Date(2020, 0, 10))).toBe(true)
      expect(isInRange(new Date(2020, 0, 11), new Date(2020, 0, 5), new Date(2020, 0, 10))).toBe(false)
    })
  })
  describe('getFirstDayOfTheWeek', () => {
    test('should return the first day of the given week', () => {
      expect(getFirstDayOfTheWeek(new Date(2021, 1, 26)).getDay()).toBe(1)
      expect(getFirstDayOfTheWeek(new Date(2021, 1, 26)).getDate()).toBe(22)
    })
  })

  describe('isSame...', () => {
    test('should return the first day of the given week', () => {
      const date = new Date(2021, 1, 26)
      expect(isSameYear(date, new Date(2021, 2, 2))).toBe(true)
      expect(isSameMonth(date, new Date(2021, 1, 2))).toBe(true)
      expect(isSameDay(date, date)).toBe(true)
      expect(isSameWeek(date, date)).toBe(true)
      expect(isSameWeek(date, new Date(2021, 1, 21))).toBe(false)
      expect(isSameWeek(date, new Date(2021, 1, 22))).toBe(true)
      expect(isSameWeek(date, new Date(2021, 1, 28))).toBe(true)
      expect(isSameWeek(date, new Date(2021, 2, 1))).toBe(false)
      expect(isSameYear(date, new Date(2022, 2, 2))).toBe(false)
      expect(isSameMonth(date, new Date(2021, 2, 2))).toBe(false)
      expect(isSameDay(date, new Date(2021, 1, 25))).toBe(false)
    })
  })
})
