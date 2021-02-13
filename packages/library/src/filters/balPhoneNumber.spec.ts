import { balPhoneNumber } from './balPhoneNumber'

describe('balPhoneNumber', () => {
  test('should render the number having no prefix"', () => {
    expect(balPhoneNumber('49,0564410808')).toBe('+49 56 441 08 08')
    expect(
      balPhoneNumber({
        countryCode: '49',
        phoneNumber: '0564410808',
      }),
    ).toBe('+49 56 441 08 08')
  })
  test('should render the number having a 41 prefix', () => {
    expect(balPhoneNumber('41,41564410808')).toBe('+41 56 441 08 08')
    expect(
      balPhoneNumber({
        countryCode: '41',
        phoneNumber: '41564410808',
      }),
    ).toBe('+41 56 441 08 08')
  })
  test('should render the number having a 001 prefix', () => {
    expect(balPhoneNumber('1,001564410808')).toBe('+1 56 441 08 08')
  })
  test('should render the number having spaces with +53 prefix', () => {
    expect(balPhoneNumber('53,+53 56 441 0808')).toBe('+53 56 441 08 08')
  })
  test('should render the number having spaces with no prefix', () => {
    expect(balPhoneNumber('53,056 441 08 08')).toBe('+53 56 441 08 08')
  })
  test('should return empty string', () => {
    expect(balPhoneNumber('')).toBe('')
  })
  test('should return empty string', () => {
    expect(balPhoneNumber(undefined)).toBe('')
  })
  test('should return empty string', () => {
    expect(balPhoneNumber(undefined)).toBe('')
  })
  test('should return empty string', () => {
    expect(balPhoneNumber('fabirizio lazzaretti')).toBe('')
  })
  test('should return empty string', () => {
    expect(balPhoneNumber('41056 441 08 08')).toBe('')
  })
  test('should return empty string', () => {
    expect(balPhoneNumber('+41056 441 08 08')).toBe('')
  })
  test('expects to cut the first zero on a long number', () => {
    expect(balPhoneNumber('53,051 2312323 2352 2 5242')).toBe('+53 51 2312323 2352 2 5242')
  })
  test('should return empty string', () => {
    expect(balPhoneNumber('14408 08')).toBe('')
  })
  test('should render the number having lots of spaces', () => {
    expect(balPhoneNumber('53,0053   56  441    0808')).toBe('+53 56 441 08 08')
  })
  test('should render a german phone number', () => {
    expect(balPhoneNumber('49,017634454671')).toBe('+49 17634454671')
  })
  test('should render a french phone number', () => {
    expect(balPhoneNumber('33,0953951068')).toBe('+33 95 395 10 68')
  })
  test('should render another french phone number', () => {
    expect(balPhoneNumber('33,632271760')).toBe('+33 63 227 17 60')
  })
})
