import {
  PhoneFormatter,
  caretFromDigitCount,
  countDigitsBefore,
  detectCountryFromInput,
  getExamplePlaceholder,
} from './formatting'

describe('ds-input-phone formatting', () => {
  describe('PhoneFormatter', () => {
    test('derives E.164 and national digits while typing a Swiss number', () => {
      const formatter = new PhoneFormatter('CH')
      expect(formatter.formatLive('791234567')).toBe('79 123 45 67')
      expect(formatter.getNationalNumber()).toBe('791234567')
      expect(formatter.getE164()).toBe('+41791234567')
    })

    test('removes the Swiss national prefix from the stable display', () => {
      const formatter = new PhoneFormatter('CH')
      expect(formatter.formatLive('0791234567')).toBe('079 123 45 67')
      expect(formatter.formatStable()).toBe('79 123 45 67')
      expect(formatter.getNationalNumber()).toBe('791234567')
      expect(formatter.getE164()).toBe('+41791234567')
    })

    test('keeps a significant leading zero in an Italian landline number', () => {
      const formatter = new PhoneFormatter('IT')
      expect(formatter.formatLive('0612345678')).toBe('06 1234 5678')
      expect(formatter.formatStable()).toBe('06 1234 5678')
      expect(formatter.getNationalNumber()).toBe('0612345678')
      expect(formatter.getE164()).toBe('+390612345678')
    })

    test('strips an international calling code from the number field', () => {
      const formatter = new PhoneFormatter('CH')
      expect(formatter.formatLive('+41791234567')).toBe('79 123 45 67')
      expect(formatter.formatLive('0041791234567')).toBe('79 123 45 67')
    })

    test('reformats existing national digits against a new country', () => {
      const formatter = new PhoneFormatter('CH')
      formatter.formatLive('791234567')
      formatter.setCountry('DE')
      expect(formatter.formatLive('791234567')).toBe('791 234567')
      expect(formatter.formatStable()).toBe('791 234567')
    })

    test('returns null E.164 for an empty field', () => {
      const formatter = new PhoneFormatter('CH')
      formatter.formatLive('')
      expect(formatter.getE164()).toBeNull()
      expect(formatter.getNationalNumber()).toBe('')
    })
  })

  describe('detectCountryFromInput', () => {
    test('reads the country from + and 00 international calling codes', () => {
      expect(detectCountryFromInput('+33612345678')).toBe('FR')
      expect(detectCountryFromInput(' +41791234567 ')).toBe('CH')
      expect(detectCountryFromInput('0041791234567')).toBe('CH')
    })

    test('ignores national numbers and empty values', () => {
      expect(detectCountryFromInput('791234567')).toBeUndefined()
      expect(detectCountryFromInput('')).toBeUndefined()
      expect(detectCountryFromInput('41')).toBeUndefined()
    })
  })

  describe('getExamplePlaceholder', () => {
    test('returns a country-specific mobile example without the calling code', () => {
      expect(getExamplePlaceholder('CH')).toBe('78 123 45 67')
      expect(getExamplePlaceholder('US')).toBe('201 555 0123')
    })

    test('returns an empty placeholder without a selected country', () => {
      expect(getExamplePlaceholder()).toBe('')
    })
  })

  describe('caret helpers', () => {
    test('counts digits before the caret', () => {
      expect(countDigitsBefore('079 123', 0)).toBe(0)
      expect(countDigitsBefore('079 123', 3)).toBe(3)
      expect(countDigitsBefore('079 123', 4)).toBe(3)
      expect(countDigitsBefore('079 123', 7)).toBe(6)
    })

    test('maps a digit count back to a caret index in formatted text', () => {
      expect(caretFromDigitCount('079 123 45 67', 0)).toBe(0)
      expect(caretFromDigitCount('079 123 45 67', 3)).toBe(3)
      expect(caretFromDigitCount('079 123 45 67', 4)).toBe(5)
      expect(caretFromDigitCount('079 123 45 67', 11)).toBe(13)
    })
  })
})
