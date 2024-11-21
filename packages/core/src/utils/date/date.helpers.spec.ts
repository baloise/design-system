import { formatDateString, isValidIsoString, format, parse } from './date.helpers'

describe('date', () => {
  describe('formatDateString', () => {
    test('should turn a date into a iso date string', () => {
      expect(formatDateString(undefined)).toBe('')
      expect(formatDateString(new Date(2022, 0, 1))).toBe('2022-01-01')
      expect(formatDateString(new Date(2022, 11, 31))).toBe('2022-12-31')
    })
  })

  describe('isValidIsoString', () => {
    test('should verify that the given string matches the iso date string format', () => {
      expect(isValidIsoString('2022-12-31')).toBe(true)
      expect(isValidIsoString('2022-01-01')).toBe(true)
      expect(isValidIsoString('2022-01-00')).toBe(false)
      expect(isValidIsoString('2022-00-01')).toBe(false)
      expect(isValidIsoString('')).toBe(false)
      expect(isValidIsoString(undefined)).toBe(false)
    })
  })

  describe('format', () => {
    test('should format the JS Date into the given local format to display', () => {
      expect(format('de-CH', new Date(2022, 11, 31))).toBe('31.12.2022')
      expect(format('fr-BE', new Date(2022, 11, 31))).toBe('31/12/2022')
      expect(format('de-CH', new Date(2022, 0, 1))).toBe('01.01.2022')
      expect(format('de-CH', undefined)).toBe('')
    })
  })

  describe('parse', () => {
    test('should parse the iso date string into a JS Date', () => {
      expect(parse('2022-12-31')).toStrictEqual(new Date('2022-12-31T00:00:00.000Z'))
      expect(parse('2022-01-01')).toStrictEqual(new Date('2022-01-01T00:00:00.000Z'))
      expect(parse('2022-01-00')).toBe(undefined)
      expect(parse('2022-00-01')).toBe(undefined)
      expect(parse('')).toBe(undefined)
    })
  })
})
