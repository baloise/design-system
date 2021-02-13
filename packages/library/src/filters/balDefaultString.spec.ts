import { balDefaultString } from './balDefaultString'

describe('balDefaultString', () => {
  test('should use the pipe correctly', () => {
    expect(balDefaultString('')).toBe('-')
    expect(balDefaultString(undefined)).toBe('-')
    expect(balDefaultString(null)).toBe('-')

    expect(balDefaultString('', '?')).toBe('?')
    expect(balDefaultString(undefined, '?')).toBe('?')
    expect(balDefaultString(null, '?')).toBe('?')

    expect(balDefaultString(null, 'a')).toBe('a')
    expect(balDefaultString(null, 'A')).toBe('A')
    expect(balDefaultString(null, 'abc')).toBe('abc')

    expect(balDefaultString(null, 'abcABC$[£¶❤💋♫☺')).toBe('abcABC$[£¶❤💋♫☺')
    expect(balDefaultString('abcABC$[£¶❤💋♫☺')).toBe('abcABC$[£¶❤💋♫☺')
    expect(balDefaultString('abcABC$[£¶❤💋♫☺', '???')).toBe('abcABC$[£¶❤💋♫☺')
  })
})
