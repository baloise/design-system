import { parseDate } from './balDateUtil'

describe('parseDate', () => {
  describe('getDateTime', () => {
    test('should', () => {
      expect(parseDate('07.02.1988')?.toISOString()).toBe('1988-02-07T00:00:00.000Z')
      expect(parseDate('7.2.1988')?.toISOString()).toBe('1988-02-07T00:00:00.000Z')
    })
  })
})
