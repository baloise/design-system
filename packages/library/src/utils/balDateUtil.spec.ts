import { toDate, format, isValidDateString, newDateString, isoString } from './balDateUtil'

describe('parseDate', () => {
  describe('isoString', () => {
    test('should turn a date into a iso date string', () => {
      expect(isoString(undefined)).toBe('')
      expect(isoString(new Date(2022, 0, 1))).toBe('2022-01-01')
      expect(isoString(new Date(2022, 11, 31))).toBe('2022-12-31')
    })
  })

  describe('newDateString', () => {
    test('should', () => {
      expect(newDateString(2033, 3, 2)).toBe('2033-03-02')
      expect(newDateString(new Date(2022, 1, 1))).toBe('2022-02-01')
    })
  })

  describe('toDate', () => {
    test('should', () => {
      expect(toDate('07.12.2000')?.toISOString()).toBe('2000-12-07T00:00:00.000Z')
      expect(toDate('2000-12-07')?.toISOString()).toBe('2000-12-07T00:00:00.000Z')
      expect(toDate('')).toBe(undefined)
      expect(toDate(undefined)).toBe(undefined)
      expect(toDate(null)).toBe(undefined)
    })
  })

  describe('format', () => {
    test('should', () => {
      expect(format('1988-02-07')).toBe('07.02.1988')
      expect(format('1988-02-07T00:00:00.000Z')).toBe('')
      expect(format('07.02.1988')).toBe('')
      expect(format('')).toBe('')
      expect(format(undefined)).toBe('')
      expect(format(null)).toBe('')
    })
  })

  describe('isValidDateString', () => {
    test('should', () => {
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
})
