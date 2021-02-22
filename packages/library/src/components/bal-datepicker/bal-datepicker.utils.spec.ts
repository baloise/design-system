import { convertInputValueToDateString, formatInputValue, isValidDateString } from './bal-datepicker.utils'

describe('bal-datepicker-utils', () => {
  describe('isValidDateString', () => {
    test('should validate valid date and return true', () => {
      expect(isValidDateString('20.02.1988')).toBe(true)
    })
    test('should validate the shorthand valid date and return true', () => {
      expect(isValidDateString('2.2.1988')).toBe(true)
    })
    test('should validate the shorthand invalid date and return false', () => {
      expect(isValidDateString(undefined)).toBe(false)
      expect(isValidDateString(null)).toBe(false)
      expect(isValidDateString('2.2.19')).toBe(false)
      expect(isValidDateString('2.2.191')).toBe(false)
      expect(isValidDateString('02.02.191')).toBe(false)
      expect(isValidDateString('..')).toBe(false)
      expect(isValidDateString('')).toBe(false)
    })
  })
  describe('formatInputValue', () => {
    test('should format value', () => {
      expect(formatInputValue('07.02.1988')).toBe('07.02.1988')
      expect(formatInputValue('7.2.1988')).toBe('07.02.1988')
      expect(formatInputValue('7.2.198')).toBe('')
      expect(formatInputValue('')).toBe('')
    })
  })
  describe('convertInputValueToDateString', () => {
    test('should format value', () => {
      expect(convertInputValueToDateString('07.02.1988')).toBe('1988-02-07T00:00:00.000Z')
      expect(convertInputValueToDateString('7.2.1988')).toBe('1988-02-07T00:00:00.000Z')
      expect(convertInputValueToDateString('7.2.198')).toBe(undefined)
      expect(convertInputValueToDateString('...')).toBe(undefined)
      expect(convertInputValueToDateString('')).toBe(undefined)
    })
  })
})
