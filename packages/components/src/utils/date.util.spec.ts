import { parse } from './date.util'

describe('date.utils', () => {
  test('should parse short date strings', () => {
    expect(JSON.stringify(parse('2022-01-20'))).toBe('"2022-01-20T00:00:00.000Z"')
    expect(JSON.stringify(parse('2.2.1'))).toBe('"2001-02-02T00:00:00.000Z"')
    expect(JSON.stringify(parse('2002-01-01'))).toBe('"2002-01-01T00:00:00.000Z"')
    expect(JSON.stringify(parse('1-1-1'))).toBe('"2001-01-01T00:00:00.000Z"')
  })
})
