import { parse } from './date.util'

describe('date.utils', () => {
  test('should parse short date strings', () => {
    expect(JSON.stringify(parse('2022-01-20'))).toBe('"2022-01-19T23:00:00.000Z"')
    expect(JSON.stringify(parse('22-01-20'))).toBe('"2022-01-19T23:00:00.000Z"')
  })
})
