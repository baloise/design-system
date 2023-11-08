import { formatTime } from '../bal-time-input.util'

describe('formatTime', () => {
  test('full entry:', () => {
    const result = formatTime('1945')
    expect(result).toStrictEqual('19:45')
  })
  test('empty:', () => {
    const result = formatTime('')
    expect(result).toStrictEqual('')
  })
  test('full entry:', () => {
    const result = formatTime('0336')
    expect(result).toStrictEqual('03:36')
  })
  test('1 digit:', () => {
    const result = formatTime('2')
    expect(result).toStrictEqual('2')
  })
  test('2 digits:', () => {
    const result = formatTime('23')
    expect(result).toStrictEqual('23')
  })
  test('3 digits:', () => {
    const result = formatTime('125')
    expect(result).toStrictEqual('12:5')
  })
})
