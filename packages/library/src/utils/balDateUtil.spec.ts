import { toDate, format, isValidDateString, newDateString } from './balDateUtil'

describe('parseDate', () => {
  describe('newDateString', () => {
    test('should', () => {
      expect(newDateString(new Date(2022, 2, 1))).toBe('2022-02-01T00:00:00.000Z')
      expect(newDateString(2022, 2, 1)).toBe('2022-02-01T00:00:00.000Z')
    })
  })
  describe('format', () => {
    test('should', () => {
      expect(format('1988-02-07T00:00:00.000Z')).toBe('07.02.1988')
      expect(format('')).toBe('')
      expect(format(undefined)).toBe('')
      expect(format(null)).toBe('')
    })
  })
  describe('toDate', () => {
    test('should', () => {
      expect(toDate('07.02.1988')?.toISOString()).toBe('1988-02-07T00:00:00.000Z')
      expect(toDate('1988-02-07T00:00:00.000Z')?.toISOString()).toBe('1988-02-07T00:00:00.000Z')
      expect(toDate('')).toBe(undefined)
      expect(toDate(undefined)).toBe(undefined)
      expect(toDate(null)).toBe(undefined)
    })
  })
  describe('isValidDateString', () => {
    test('should', () => {
      expect(isValidDateString('1900-12-31T00:00:00.000Z')).toBe(true)
      expect(isValidDateString('1899-02-07T00:00:00.000Z')).toBe(false)
      expect(isValidDateString('1999-13-07T00:00:00.000Z')).toBe(false)
      expect(isValidDateString('1999-00-32T00:00:00.000Z')).toBe(false)
      expect(isValidDateString('1999-01-00T00:00:00.000Z')).toBe(false)
      expect(isValidDateString('1999-01-32T00:00:00.000Z')).toBe(false)
      expect(isValidDateString('')).toBe(false)
      expect(isValidDateString(undefined)).toBe(false)
    })
  })

  // describe('getDateTime', () => {
  //   test('should', () => {
  //     expect(parseDate('07.02.1988')?.toISOString()).toBe('1988-02-07T00:00:00.000Z')
  //     expect(parseDate('7.2.1988')?.toISOString()).toBe('1988-02-07T00:00:00.000Z')
  //   })
  // })
})
