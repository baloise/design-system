import { isValidMonetaryNumber } from './balNumberUtil'

describe('balNumberUtil', () => {
  describe('isValidMonetaryNumber', () => {
    test('should return true if it is a valid monetary number', () => {
      expect(isValidMonetaryNumber('')).toBe(false)
      expect(isValidMonetaryNumber('a')).toBe(false)
      expect(isValidMonetaryNumber('-85')).toBe(true)
      expect(isValidMonetaryNumber("1'000.98")).toBe(true)
    })
  })
})
