/* eslint-disable */
import { updateBalLanguge, updateBalRegion } from '../../../../config'
import { filterInputValue, formatInputValue } from '../bal-input.utils'

describe('bal-input', () => {
  describe('filterInputValue', () => {
    test('should filter input for a valid number', () => {
      expect(filterInputValue('a', '')).toBe('')
      expect(filterInputValue('1.0.', '1.0')).toBe('1.0')
      expect(filterInputValue('0', '')).toBe('0')
      expect(filterInputValue('3', '')).toBe('3')
      expect(filterInputValue('999', '')).toBe('999')
      expect(filterInputValue('.', '')).toBe('.')
      expect(filterInputValue('.0', '')).toBe('.0')
      expect(filterInputValue('.4', '')).toBe('.4')
      expect(filterInputValue('0.', '')).toBe('0.')
      expect(filterInputValue('0.4', '')).toBe('0.4')
      expect(filterInputValue('1.4', '')).toBe('1.4')
    })
    test('should filter input value for a valid decmial number', () => {
      expect(filterInputValue('a', '', 2)).toBe('')
      expect(filterInputValue('0', '', 2)).toBe('0')
      expect(filterInputValue('3', '', 2)).toBe('3')
      expect(filterInputValue('999', '', 2)).toBe('999')
      expect(filterInputValue('.', '', 2)).toBe('.')
      expect(filterInputValue('.0', '', 2)).toBe('.0')
      expect(filterInputValue('.4', '', 2)).toBe('.4')
      expect(filterInputValue('0.', '', 2)).toBe('0.')
      expect(filterInputValue('0.4', '', 2)).toBe('0.4')
      expect(filterInputValue('1.4', '', 2)).toBe('1.4')
      expect(filterInputValue('1.45', '', 2)).toBe('1.45')
      expect(filterInputValue('1.456', '1.45', 2)).toBe('1.45')
      expect(filterInputValue('^', '', 2)).toBe('')
    })
    test('should filter input value for a valid number without decimal', () => {
      expect(filterInputValue('a', '', 0)).toBe('')
      expect(filterInputValue('0', '', 0)).toBe('0')
      expect(filterInputValue('.', '', 0)).toBe('')
      expect(filterInputValue('1.', '1', 0)).toBe('1')
      expect(filterInputValue('1a', '1', 0)).toBe('1')
      expect(filterInputValue('999', '', 0)).toBe('999')
    })
  })
  describe('formatInputValue', () => {
    test('should add delemiter', () => {
      expect(formatInputValue('0')).toBe('0')
      expect(formatInputValue('10')).toBe('10')
      expect(formatInputValue('100')).toBe('100')
      expect(formatInputValue('1000')).toBe('1’000')
      expect(formatInputValue('10000')).toBe('10’000')
      expect(formatInputValue('100000')).toBe('100’000')
      expect(formatInputValue('1000000')).toBe('1’000’000')
    })
    test('should adjust the decimal points', () => {
      expect(formatInputValue('0')).toBe('0')
      expect(formatInputValue('0.1', 2)).toBe('0.10')
      expect(formatInputValue('a')).toBe('')
      expect(formatInputValue('.1')).toBe('0.1')
      expect(formatInputValue('.1', 2)).toBe('0.10')
      expect(formatInputValue('.1', 0)).toBe('0')
    })
  })
  describe('filterInputValue for another locale', () => {
    test('filterInputValue for de-DE', () => {
      const BaloiseDesignSystem = jest.fn()
      Object.defineProperty(window, 'BaloiseDesignSystem', BaloiseDesignSystem)
      BaloiseDesignSystem.mockImplementation(() => ({
        config: {
          language: 'de',
          region: 'DE',
        },
      }))
      expect(filterInputValue('1,4', '', 2)).toBe('1,4')
    })
  })
  describe('formatInputValue for another locale', () => {
    test('formatInputValue for de-DE', () => {
      const BaloiseDesignSystem = jest.fn()
      Object.defineProperty(window, 'BaloiseDesignSystem', BaloiseDesignSystem)
      BaloiseDesignSystem.mockImplementation(() => ({
        config: {
          language: 'de',
          region: 'DE',
        },
      }))
      expect(formatInputValue('1000000')).toBe('1.000.000')
      expect(formatInputValue('0.1', 2)).toBe('0,10')
    })
  })
})
