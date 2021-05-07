import { balFileSize } from './balFileSize'

describe('balFileSize', () => {
  test('should render bytes correctly', () => {
    expect(balFileSize(100)).toEqual('100 bytes')
  })
  test('should render small bytes correctly', () => {
    expect(balFileSize(1)).toEqual('1 bytes')
  })
  test('should render big bytes correctly', () => {
    expect(balFileSize(999)).toEqual('999 bytes')
  })
  test('should render small kb correctly', () => {
    expect(balFileSize(1000)).toEqual('1000 bytes')
  })
  test('should render big kb correctly', () => {
    expect(balFileSize(999999)).toEqual('977 kB')
  })
  test('should render small mb correctly', () => {
    expect(balFileSize(1000000)).toEqual('977 kB')
  })
  test('should render mb correctly', () => {
    expect(balFileSize(86956565)).toEqual('82.9 MB')
  })
})
