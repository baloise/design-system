import { isEmpty } from './balUtil'

describe('balUtil', () => {
  describe('isEmpty', () => {
    test('should return true if the value is empty', () => {
      expect(isEmpty('')).toBe(true)
      expect(isEmpty(null)).toBe(true)
      expect(isEmpty(undefined)).toBe(true)
    })
    test('should return false if the value is not empty', () => {
      expect(isEmpty('1')).toBe(false)
      expect(isEmpty(1)).toBe(false)
      expect(isEmpty(true)).toBe(false)
      expect(isEmpty(false)).toBe(false)
    })
  })
})
