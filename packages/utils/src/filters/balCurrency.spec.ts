import { balCurrency } from './balCurrency'

describe('balCurrency', () => {
  test('number without decimal should be rendered with zero decimals"', () => {
    expect(balCurrency(1)).toBe('CHF' + String.fromCharCode(160) + '1.00')
  })
  test('number with decimal should be rendered with decimal"', () => {
    expect(balCurrency(1.1)).toBe('CHF' + String.fromCharCode(160) + '1.10')
  })
  test('number with zero decimal should be rendered with zero decimal"', () => {
    expect(balCurrency(1.0)).toBe('CHF' + String.fromCharCode(160) + '1.00')
  })
  test('number with more than three digits should be rendered with thousand separator"', () => {
    expect(balCurrency(1000)).toBe('CHF' + String.fromCharCode(160) + "1'000.00")
  })
  test('number with less than three digits should be rendered without thousand separator"', () => {
    expect(balCurrency(100)).toBe('CHF' + String.fromCharCode(160) + '100.00')
  })
  test('long number should be rendered correctly"', () => {
    expect(balCurrency(1234567.89)).toBe('CHF' + String.fromCharCode(160) + "1'234'567.89")
  })
  test('number with currency sign parameter should render it"', () => {
    expect(balCurrency(1, '€')).toBe('€' + String.fromCharCode(160) + '1.00')
  })
  test('null should be rendered as empty string"', () => {
    expect(balCurrency(null, '€')).toBe('')
  })
  test('zero should be rendered if second parameter is true"', () => {
    expect(balCurrency(0.0, '€', true)).toBe('€' + String.fromCharCode(160) + '0.00')
  })
  test('number with decimal should be rendered with custom number of decimals"', () => {
    expect(balCurrency(1.23456, 'CHF', false, 3)).toBe('CHF' + String.fromCharCode(160) + '1.235')
  })
  test('zero should be displayed and should be rounded to one decimal"', () => {
    expect(balCurrency(0.0, '€', true, 1)).toBe('€' + String.fromCharCode(160) + '0.0')
  })
})
