import { balContractNumber } from './balContractNumber'

describe('balPoliceNumber', () => {
  test('should format a claim number correctly', () => {
    expect(balContractNumber('501222333')).toBe('50/1.222.333')
  })
  test('should format null as empty string', () => {
    expect(balContractNumber(null)).toBe('')
  })
  test('should output a number with a wrong format raw', () => {
    expect(balContractNumber('123')).toBe('123')
  })
  test('should format a claim number with a sign postfix correctly', () => {
    expect(balContractNumber('0501222333')).toBe('50/1.222.333')
  })
})
