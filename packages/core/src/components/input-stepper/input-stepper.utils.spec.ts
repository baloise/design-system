import { clampValue, stepMinus, stepPlus } from './input-stepper.utils'

describe('ds-input-stepper', () => {
  describe('clampValue', () => {
    test('keeps a value already inside [min, max]', () => {
      expect(clampValue(5, 0, 10)).toBe(5)
      expect(clampValue(0, 0, 10)).toBe(0)
      expect(clampValue(10, 0, 10)).toBe(10)
    })

    test('clamps a value below min up to min', () => {
      expect(clampValue(-5, 0, 10)).toBe(0)
    })

    test('clamps a value above max down to max', () => {
      expect(clampValue(15, 0, 10)).toBe(10)
    })

    test('supports negative ranges', () => {
      expect(clampValue(-100, -50, 50)).toBe(-50)
      expect(clampValue(0, -50, -10)).toBe(-10)
    })

    test('resolves NaN to min', () => {
      expect(clampValue(NaN, 0, 10)).toBe(0)
      expect(clampValue(NaN, -5, 5)).toBe(-5)
    })
  })

  describe('stepPlus', () => {
    test('adds integer step', () => {
      expect(stepPlus(0, 1)).toBe(1)
      expect(stepPlus(5, 3)).toBe(8)
    })

    test('adds decimal step without floating-point drift', () => {
      expect(stepPlus(0, 0.1)).toBe(0.1)
      expect(stepPlus(0.1, 0.1)).toBe(0.2)
      expect(stepPlus(0.2, 0.1)).toBe(0.3)
      expect(stepPlus(stepPlus(stepPlus(0, 0.1), 0.1), 0.1)).toBe(0.3)
    })
  })

  describe('stepMinus', () => {
    test('subtracts integer step', () => {
      expect(stepMinus(5, 1)).toBe(4)
      expect(stepMinus(0, 3)).toBe(-3)
    })

    test('subtracts decimal step without floating-point drift', () => {
      expect(stepMinus(0.3, 0.1)).toBe(0.2)
      expect(stepMinus(0.2, 0.1)).toBe(0.1)
      expect(stepMinus(0.1, 0.1)).toBe(0)
    })
  })
})
