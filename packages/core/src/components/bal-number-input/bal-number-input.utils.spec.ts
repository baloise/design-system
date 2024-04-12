import {
  countDecimalSeparators,
  isNotNumber,
  isNumber,
  toFixedNumber,
  toNumber,
  toUserFormattedNumber,
  validateKeyDown,
} from './bal-number-input.utils'

describe('bal-number-input', () => {
  describe('isNumber', () => {
    test('should check if the string is a valid number', () => {
      expect(isNumber(undefined)).toBeFalsy()
      expect(isNumber(null)).toBeFalsy()
      expect(isNumber('-')).toBeFalsy()
      expect(isNumber('')).toBeFalsy()
      expect(isNumber('.')).toBeFalsy()
      expect(isNumber('a')).toBeFalsy()
      expect(isNumber('0')).toBeTruthy()
      expect(isNumber('0.0')).toBeTruthy()
      expect(isNumber('0.1')).toBeTruthy()
      expect(isNumber('42')).toBeTruthy()
      expect(isNumber('-42')).toBeTruthy()
      expect(isNumber("40'000")).toBeTruthy()
      expect(isNumber('40`000')).toBeTruthy()
    })
  })

  describe('isNotNumber', () => {
    test('should check if the string is a invalid number', () => {
      expect(isNotNumber(undefined)).toBeTruthy()
      expect(isNotNumber(null)).toBeTruthy()
      expect(isNotNumber('')).toBeFalsy()
      expect(isNotNumber('-')).toBeFalsy()
      expect(isNotNumber('.')).toBeFalsy()
      expect(isNotNumber('a')).toBeTruthy()
      expect(isNotNumber('0')).toBeFalsy()
      expect(isNotNumber('0.0')).toBeFalsy()
      expect(isNotNumber('0.1')).toBeFalsy()
      expect(isNotNumber('42')).toBeFalsy()
      expect(isNotNumber('-42')).toBeFalsy()
      expect(isNumber("40'000")).toBeTruthy()
      expect(isNumber('40`000')).toBeTruthy()
    })
  })

  describe('countDecimalSeparators', () => {
    test('should count the amount of separators', () => {
      expect(countDecimalSeparators('')).toBe(0)
      expect(countDecimalSeparators('1')).toBe(0)
      expect(countDecimalSeparators('1.')).toBe(1)
      expect(countDecimalSeparators('1.2.')).toBe(2)
      expect(countDecimalSeparators('.')).toBe(1)
      expect(countDecimalSeparators('..')).toBe(2)
      expect(countDecimalSeparators('...')).toBe(3)
    })
  })

  describe('toNumber', () => {
    it('should convert positive integer correctly', () => {
      const result = toNumber('42')
      expect(result).toBe(42)
    })

    it('should convert positive float correctly', () => {
      const result = toNumber('3.14', 2)
      expect(result).toBe(3.14)
    })

    it('should return undefined for empty string', () => {
      const result = toNumber('')
      expect(result).toBeUndefined()
    })

    it('should return undefined for undefined value', () => {
      const result = toNumber(undefined)
      expect(result).toBeUndefined()
    })

    it('should return undefined for null value', () => {
      const result = toNumber(null)
      expect(result).toBeUndefined()
    })

    it('should return undefined for NaN value', () => {
      const result = toNumber('abc')
      expect(result).toBeUndefined()
    })

    it('should return undefined for negative symbol', () => {
      const result = toNumber('-')
      expect(result).toBeUndefined()
    })

    it('should return undefined for decimal separator', () => {
      const result = toNumber('.')
      expect(result).toBeUndefined()
    })

    it('should return number and ignore separator', () => {
      const result = toNumber("42'000")
      expect(result).toBe(42000)
    })

    it('should return number and ignore autofill separator', () => {
      const result = toNumber('42`000')
      expect(result).toBe(42000)
    })
  })

  describe('toFixedNumber', () => {
    it('should convert positive integer correctly', () => {
      const result = toFixedNumber('42')
      expect(result).toBe('42')
    })

    it('should convert positive float with specified decimal points', () => {
      const result = toFixedNumber('3.14159', 2)
      expect(result).toBe('3.14')
    })

    it('should add leading 0 for values starting with decimal separator', () => {
      const result = toFixedNumber('.5', 1)
      expect(result).toBe('0.5')
    })

    it('should return empty string for non-numeric values', () => {
      const result = toFixedNumber('abc')
      expect(result).toBe('')
    })

    it('should handle decimal separator as first character', () => {
      const result = toFixedNumber('.', 2)
      expect(result).toBe('0.00')
    })

    it('should handle decimal separator with specified decimal points', () => {
      const result = toFixedNumber('1.23456', 3)
      expect(result).toBe('1.235')
    })

    it('should return empty string for undefined value', () => {
      const result = toFixedNumber(undefined as any, 2)
      expect(result).toBe('')
    })

    it('should return empty string for null value', () => {
      const result = toFixedNumber(null as any, 2)
      expect(result).toBe('')
    })
  })

  describe('toUserFormattedNumber', () => {
    it('should convert positive integer correctly without suffix', () => {
      const result = toUserFormattedNumber('42')
      expect(result).toBe('42')
    })

    it('should convert positive float with specified decimal points and suffix', () => {
      const result = toUserFormattedNumber('3.14159', 2, 'm/s')
      expect(result).toBe('3.14 m/s')
    })

    it('should add leading 0 for values starting with decimal separator', () => {
      const result = toUserFormattedNumber('.5', 1, 'kg')
      expect(result).toBe('0.5 kg')
    })

    it('should return empty string for non-numeric values', () => {
      const result = toUserFormattedNumber('abc', 2, 'm')
      expect(result).toBe('')
    })

    it('should handle decimal separator as first character', () => {
      const result = toUserFormattedNumber('.', 2, 'A')
      expect(result).toBe('0.00 A')
    })

    it('should handle decimal separator with specified decimal points and suffix', () => {
      const result = toUserFormattedNumber('1.23456', 3, 'g')
      expect(result).toBe('1.235 g')
    })

    it('should return empty string for undefined value and suffix', () => {
      const result = toUserFormattedNumber(undefined as any, 2, 'Hz')
      expect(result).toBe('')
    })

    it('should return empty string for null value and suffix', () => {
      const result = toUserFormattedNumber(null as any, 2, 'V')
      expect(result).toBe('')
    })

    it('should handle suffix with leading and trailing spaces', () => {
      const result = toUserFormattedNumber('123.45', 2, ' m ')
      expect(result).toBe('123.45 m')
    })
  })

  describe('validateKeyDown', () => {
    test('should accept a basic number like 42', () => {
      expect(
        validateKeyDown({
          key: '4',
          ctrlKey: false,
          metaKey: false,
          newValue: '4',
          oldValue: '',
          selectionStart: 0,
          selectionEnd: 0,
          decimal: 0,
        }),
      ).toBeTruthy()

      expect(
        validateKeyDown({
          key: '2',
          ctrlKey: false,
          metaKey: false,
          newValue: '42',
          oldValue: '4',
          selectionStart: 1,
          selectionEnd: 1,
          decimal: 0,
        }),
      ).toBeTruthy()
    })
  })

  test('should accept a negative number like 42', () => {
    expect(
      validateKeyDown({
        key: '-',
        ctrlKey: false,
        metaKey: false,
        newValue: '-',
        oldValue: '',
        selectionStart: 0,
        selectionEnd: 0,
        decimal: 0,
      }),
    ).toBeTruthy()

    expect(
      validateKeyDown({
        key: '2',
        ctrlKey: false,
        metaKey: false,
        newValue: '-2',
        oldValue: '-',
        selectionStart: 1,
        selectionEnd: 1,
        decimal: 0,
      }),
    ).toBeTruthy()

    expect(
      validateKeyDown({
        key: '.',
        ctrlKey: false,
        metaKey: false,
        newValue: '2.',
        oldValue: '2',
        selectionStart: 2,
        selectionEnd: 2,
        decimal: 0,
      }),
    ).toBeFalsy()
  })

  test('should accept a decimal number like 4.2', () => {
    expect(
      validateKeyDown({
        key: '4',
        ctrlKey: false,
        metaKey: false,
        newValue: '4',
        oldValue: '',
        selectionStart: 0,
        selectionEnd: 0,
        decimal: 2,
      }),
    ).toBeTruthy()

    expect(
      validateKeyDown({
        key: '.',
        ctrlKey: false,
        metaKey: false,
        newValue: '4.',
        oldValue: '4',
        selectionStart: 1,
        selectionEnd: 1,
        decimal: 2,
      }),
    ).toBeTruthy()

    expect(
      validateKeyDown({
        key: '2',
        ctrlKey: false,
        metaKey: false,
        newValue: '4.2',
        oldValue: '4.',
        selectionStart: 2,
        selectionEnd: 2,
        decimal: 2,
      }),
    ).toBeTruthy()
  })

  test('should only accept a negative symbol at the start position', () => {
    expect(
      validateKeyDown({
        key: '-',
        ctrlKey: false,
        metaKey: false,
        newValue: '1-',
        oldValue: '1',
        selectionStart: 1,
        selectionEnd: 1,
        decimal: 0,
      }),
    ).toBeFalsy()

    expect(
      validateKeyDown({
        key: '-',
        ctrlKey: false,
        metaKey: false,
        newValue: '--',
        oldValue: '-',
        selectionStart: 1,
        selectionEnd: 1,
        decimal: 0,
      }),
    ).toBeFalsy()
  })

  test('should only accept one decimal point', () => {
    expect(
      validateKeyDown({
        key: '.',
        ctrlKey: false,
        metaKey: false,
        newValue: '.2.',
        oldValue: '.2',
        selectionStart: 3,
        selectionEnd: 3,
        decimal: 2,
      }),
    ).toBeFalsy()

    expect(
      validateKeyDown({
        key: '.',
        ctrlKey: false,
        metaKey: false,
        newValue: '..',
        oldValue: '.',
        selectionStart: 2,
        selectionEnd: 2,
        decimal: 2,
      }),
    ).toBeFalsy()
  })

  test('should not allow non number keys', () => {
    expect(
      validateKeyDown({
        key: 'a',
        ctrlKey: false,
        metaKey: false,
        newValue: 'a',
        oldValue: '',
        selectionStart: 1,
        selectionEnd: 1,
        decimal: 0,
      }),
    ).toBeFalsy()

    expect(
      validateKeyDown({
        key: '!',
        ctrlKey: false,
        metaKey: false,
        newValue: '!',
        oldValue: '',
        selectionStart: 1,
        selectionEnd: 1,
        decimal: 0,
      }),
    ).toBeFalsy()
  })

  test('should not allow more digits as we can take', () => {
    expect(
      validateKeyDown({
        key: '9',
        ctrlKey: false,
        metaKey: false,
        newValue: '1.429',
        oldValue: '1.42',
        selectionStart: 5,
        selectionEnd: 5,
        decimal: 2,
      }),
    ).toBeFalsy()

    expect(
      validateKeyDown({
        key: 'ArrowLeft',
        ctrlKey: false,
        metaKey: false,
        newValue: '1.42',
        oldValue: '1.42',
        selectionStart: 5,
        selectionEnd: 5,
        decimal: 2,
      }),
    ).toBeTruthy()
  })

  test('should allow navigation keys', () => {
    expect(
      validateKeyDown({
        key: 'ArrowLeft',
        ctrlKey: false,
        metaKey: false,
        newValue: '1.42',
        oldValue: '1.42',
        selectionStart: 3,
        selectionEnd: 3,
        decimal: 2,
      }),
    ).toBeTruthy()

    expect(
      validateKeyDown({
        key: 'Escape',
        ctrlKey: false,
        metaKey: false,
        newValue: '1.4',
        oldValue: '1.42',
        selectionStart: 4,
        selectionEnd: 4,
        decimal: 2,
      }),
    ).toBeTruthy()

    expect(
      validateKeyDown({
        key: 'Delete',
        ctrlKey: false,
        metaKey: false,
        newValue: '1.2',
        oldValue: '1.42',
        selectionStart: 2,
        selectionEnd: 2,
        decimal: 2,
      }),
    ).toBeTruthy()
  })

  test('should allow select all, copy and paste', () => {
    expect(
      validateKeyDown({
        key: 'a',
        ctrlKey: false,
        metaKey: true,
        newValue: '1.42',
        oldValue: '1.42',
        selectionStart: 3,
        selectionEnd: 3,
        decimal: 2,
      }),
    ).toBeTruthy()

    expect(
      validateKeyDown({
        key: 'c',
        ctrlKey: true,
        metaKey: false,
        newValue: '1.4',
        oldValue: '1.42',
        selectionStart: 4,
        selectionEnd: 4,
        decimal: 2,
      }),
    ).toBeTruthy()

    expect(
      validateKeyDown({
        key: 'v',
        ctrlKey: false,
        metaKey: true,
        newValue: '1.2',
        oldValue: '1.42',
        selectionStart: 2,
        selectionEnd: 2,
        decimal: 2,
      }),
    ).toBeTruthy()
  })
})
