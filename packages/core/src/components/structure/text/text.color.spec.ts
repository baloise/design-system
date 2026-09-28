import { resolveTextColor } from './text.color'

describe('ds-text', () => {
  describe('resolveTextColor', () => {
    test('paints disabled and ignores color, invalid, and inverted', () => {
      expect(resolveTextColor({ disabled: true, invalid: true, inverted: true, color: 'primary' })).toBe('disabled')
    })

    test('paints invalid as danger and ignores color and inverted', () => {
      expect(resolveTextColor({ invalid: true, inverted: true, color: 'primary' })).toBe('danger')
    })

    test('paints inverted and ignores color', () => {
      expect(resolveTextColor({ inverted: true, color: 'primary' })).toBe('inverted')
    })

    test('paints the given color, including info', () => {
      expect(resolveTextColor({ color: 'primary' })).toBe('primary')
      expect(resolveTextColor({ color: 'info' })).toBe('info')
      expect(resolveTextColor({ color: 'inverted' })).toBe('inverted')
    })

    test('paints nothing when color is omitted or empty and no state is set', () => {
      expect(resolveTextColor({})).toBeUndefined()
      expect(resolveTextColor({ color: '', disabled: false, invalid: false, inverted: false })).toBeUndefined()
    })
  })
})
