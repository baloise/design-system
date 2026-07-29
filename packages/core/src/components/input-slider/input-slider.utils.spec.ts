import { clampValue, decimalsFromStep, resolveInitialValue } from './input-slider.utils'

describe('ds-input-slider', () => {
  describe('resolveInitialValue', () => {
    test('defaults to min when value is unset (NaN)', () => {
      expect(resolveInitialValue(NaN, 0)).toBe(0)
      expect(resolveInitialValue(NaN, 50)).toBe(50)
      expect(resolveInitialValue(NaN, -20)).toBe(-20)
    })

    test('keeps an explicitly provided value, including zero', () => {
      expect(resolveInitialValue(0, 50)).toBe(0)
      expect(resolveInitialValue(30, 50)).toBe(30)
      expect(resolveInitialValue(-5, 0)).toBe(-5)
    })
  })

  describe('clampValue', () => {
    test('keeps a value already inside [min, max]', () => {
      expect(clampValue(50, 0, 100)).toBe(50)
      expect(clampValue(0, 0, 100)).toBe(0)
      expect(clampValue(100, 0, 100)).toBe(100)
    })

    test('clamps a value below min up to min', () => {
      expect(clampValue(-10, 0, 100)).toBe(0)
    })

    test('clamps a value above max down to max', () => {
      expect(clampValue(150, 0, 100)).toBe(100)
    })

    test('supports negative ranges', () => {
      expect(clampValue(-75, -50, 50)).toBe(-50)
      expect(clampValue(0, -50, -10)).toBe(-10)
    })

    test('degrades sanely when min > max by using the effective range', () => {
      expect(clampValue(50, 100, 0)).toBe(50)
      expect(clampValue(150, 100, 0)).toBe(100)
      expect(clampValue(-10, 100, 0)).toBe(0)
    })
  })

  describe('decimalsFromStep', () => {
    test('returns 0 for an integer step', () => {
      expect(decimalsFromStep('1')).toBe(0)
      expect(decimalsFromStep('10')).toBe(0)
    })

    test('returns the number of decimal digits for a fractional step', () => {
      expect(decimalsFromStep('0.5')).toBe(1)
      expect(decimalsFromStep('0.25')).toBe(2)
      expect(decimalsFromStep('0.001')).toBe(3)
    })

    test('falls back to a fixed precision for continuous mode ("any")', () => {
      expect(decimalsFromStep('any')).toBe(2)
    })
  })
})
