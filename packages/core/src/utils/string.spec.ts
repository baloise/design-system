import { toKebabCase } from './string'

describe('string', () => {
  describe('toKebabCase', () => {
    test('should format non string values correctly', () => {
      expect(toKebabCase('')).toBe('')
      expect(toKebabCase(undefined)).toBe('')
      expect(toKebabCase(null)).toBe('')
      expect(toKebabCase([])).toBe('')
      expect(toKebabCase({})).toBe('')
      expect(toKebabCase(7)).toBe('')
      expect(toKebabCase(78)).toBe('')
      expect(toKebabCase(true)).toBe('')
      expect(toKebabCase(false)).toBe('')
    })
    test('should format string values correctly', () => {
      expect(toKebabCase('HelloWorld')).toBe('hello-world')
      expect(toKebabCase('Hello4World')).toBe('hello-4-world')
      expect(toKebabCase('Hello44World')).toBe('hello-44-world')
      expect(toKebabCase('4World')).toBe('4-world')
      expect(toKebabCase('4World4')).toBe('4-world-4')
      expect(toKebabCase('World')).toBe('world')
    })
  })
})
