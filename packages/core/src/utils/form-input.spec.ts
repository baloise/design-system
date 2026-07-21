import { isEmptyValue, parseValue, hasValueChanged } from './form-input'

describe('form input', () => {
  describe('isEmptyValue', () => {
    test('should check if value is empty', () => {
      expect(isEmptyValue('')).toBeTruthy
      expect(isEmptyValue(undefined)).toBeTruthy
      expect(isEmptyValue(null)).toBeTruthy
      expect(isEmptyValue([])).toBeTruthy
      expect(isEmptyValue('01')).toBeFalsy
    })
  })
  describe('parseValue', () => {
    test('should return undefined if value is considered as empty', () => {
      expect(parseValue('')).toBe(undefined)
      expect(parseValue(undefined)).toBe(undefined)
      expect(parseValue(null)).toBe(undefined)
      expect(parseValue([])).toBe(undefined)
      expect(parseValue('01')).toBe('01')
    })
  })
  describe('hasValueChanged', () => {
    test('should return true if values are not equal', () => {
      expect(hasValueChanged('', undefined)).toBeFalsy()
      expect(hasValueChanged(null, undefined)).toBeFalsy()
      expect(hasValueChanged(undefined, undefined)).toBeFalsy()
      expect(hasValueChanged([], undefined)).toBeFalsy()
      expect(hasValueChanged('01', undefined)).toBeTruthy()
    })
  })
})
