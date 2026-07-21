import { getDecimalSeparator, getThousandSeparator, formatLocaleNumber, parseLocaleNumber } from './number'

describe('number', () => {
  describe('getDecimalSeparator', () => {
    test('should return the correct decimal separator in the given locale', () => {
      expect(getDecimalSeparator()).toBe('.')
    })
  })

  describe('getThousandSeparator', () => {
    test('should return the correct thousand separator in the given locale', () => {
      expect(getThousandSeparator()).toBe('’')
    })
  })

  describe('formatLocaleNumber', () => {
    test('should format the number into the given locale', () => {
      expect(formatLocaleNumber(1000.4231, 2)).toBe('1’000.42')
      expect(formatLocaleNumber(1000.42)).toBe('1’000.42')
    })
  })

  describe('parseLocaleNumber', () => {
    test('should parse the locale number into the native number', () => {
      expect(parseLocaleNumber('1’000.42')).toBe(1000.42)
      expect(parseLocaleNumber('')).toBe(NaN)
      expect(parseLocaleNumber('-1')).toBe(-1)
    })
  })
})
