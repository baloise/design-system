import { BalDate } from './date'

describe('balDate', () => {
  describe('fromAnyFormat', () => {
    test('should parse all supported formats with separator', () => {
      expect(BalDate.fromAnyFormat('20.02.1988').toISODate()).toStrictEqual('1988-02-20')
      expect(BalDate.fromAnyFormat('20/02/1988').toISODate()).toStrictEqual('1988-02-20')

      expect(BalDate.fromAnyFormat('1.02.1988').toISODate()).toStrictEqual('1988-02-01')
      expect(BalDate.fromAnyFormat('01.2.1988').toISODate()).toStrictEqual('1988-02-01')
      expect(BalDate.fromAnyFormat('1.2.1988').toISODate()).toStrictEqual('1988-02-01')
      expect(BalDate.fromAnyFormat('1.2.88').toISODate()).toStrictEqual('1988-02-01')
      expect(BalDate.fromAnyFormat('1.2.01').toISODate()).toStrictEqual('2001-02-01')
    })

    test('should parse all supported number formats', () => {
      expect(BalDate.fromAnyFormat('20021988').toISODate()).toStrictEqual('1988-02-20')
    })
  })
})
