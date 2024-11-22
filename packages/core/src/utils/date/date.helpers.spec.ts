import { dateSeparator } from './date.helpers'

describe('date', () => {
  describe('dateSeparator', () => {
    test('should provide the correct date separator', () => {
      expect(dateSeparator('de-CH')).toBe('.')
      expect(dateSeparator('fr-CH')).toBe('.')
      expect(dateSeparator('fr-BE')).toBe('/')
      expect(dateSeparator('fr-LU')).toBe('/')
    })
  })
})
