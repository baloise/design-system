import { balLimit } from './balLimit'

describe.only('balLimit', () => {
  test('should format some string correctly', () => {
    expect(balLimit('Some string that is ways to long to be rendered')).toEqual('Some string that is ...')
  })

  test('should format some short string correctly', () => {
    expect(balLimit('hey shorty', 50)).toEqual('hey shorty')
  })

  test('should format some string with a low limit correctly', () => {
    expect(balLimit('looong', 2)).toEqual('lo...')
  })

  test('should format some string with a negative limit correctly', () => {
    expect(balLimit('hans wurscht', -5)).toEqual('hans wurscht')
  })

  test('should format some string with a zero limit', () => {
    expect(balLimit('hans wurscht', 0)).toEqual('hans wurscht')
  })

  test('should format null correctly as null', () => {
    expect(balLimit(undefined)).toEqual('')
  })
})
