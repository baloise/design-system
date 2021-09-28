import { balPoliceNumber } from './balPoliceNumber'

describe('balPoliceNumber', () => {
  test('should format a claim number correctly', () => {
    expect(balPoliceNumber('501222333')).toBe('50/1.222.333')
  })
  test('should format null as empty string', () => {
    expect(balPoliceNumber(null)).toBe('')
  })
  test('should output a number with a wrong format raw', () => {
    expect(balPoliceNumber('123')).toBe('123')
  })
  test('should format a claim number with a sign postfix correctly', () => {
    expect(balPoliceNumber('0501222333')).toBe('50/1.222.333')
  })
})
