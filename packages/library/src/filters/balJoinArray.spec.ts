import { balJoinArray } from './balJoinArray'

describe('balJoinArray', () => {
  test('should format null value as empty', () => {
    expect(balJoinArray(undefined)).toEqual('')
  })

  test('should join array items with default delimiter', () => {
    expect(balJoinArray(['val1', 'val2', 'val3'])).toEqual('val1, val2, val3')
  })
  test('should join array items with custom delimiter', () => {
    expect(balJoinArray(['val1', 'val2', 'val3'], ' : ')).toEqual('val1 : val2 : val3')
  })
})
