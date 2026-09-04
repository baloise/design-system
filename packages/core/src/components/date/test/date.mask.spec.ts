import { describe, test, expect, afterEach } from 'vitest'
import { createDateMask, DateMask, isoToDisplay } from '../date.mask'

describe('dsDate', () => {
  describe('isoToDisplay', () => {
    test('formats a historical date (before the June 1894 timezone standardization) unchanged', () => {
      expect(isoToDisplay('1800-02-01', 'dd.MM.yyyy')).toBe('01.02.1800')
    })

    test('formats a modern date unchanged', () => {
      expect(isoToDisplay('2024-01-01', 'dd.MM.yyyy')).toBe('01.01.2024')
    })
  })

  describe('DateMask', () => {
    let inputEl: HTMLInputElement
    let mask: DateMask

    afterEach(() => {
      mask?.destroy()
      inputEl?.remove()
    })

    function setup() {
      inputEl = document.createElement('input')
      document.body.appendChild(inputEl)
      mask = createDateMask({
        inputEl,
        format: 'dd.MM.yyyy',
        initialValue: null,
        onAccept: () => {},
        onComplete: () => {},
      })
      return mask
    }

    test('round-trips a historical date (before June 1894) through syncFromISO without shifting it', () => {
      setup()
      mask.syncFromISO('1800-02-01')
      expect(inputEl.value).toBe('01.02.1800')
    })

    test('round-trips a modern date through syncFromISO', () => {
      setup()
      mask.syncFromISO('2024-01-01')
      expect(inputEl.value).toBe('01.01.2024')
    })

    test('rejects a calendar-invalid date (30 February) instead of rolling it over to March', () => {
      setup()
      // IMask's own round-trip validation (format(parse(str)) === str) rejects this,
      // even though our custom `parse` performs no calendar validation itself.
      ;(mask as any).mask.value = '30.02.2026'

      expect((mask as any).mask.typedValue).toBeNull()
      expect((mask as any).getISO()).toBeNull()
    })

    test('does not fire onComplete for a calendar-invalid date', () => {
      const completed: string[] = []
      inputEl = document.createElement('input')
      document.body.appendChild(inputEl)
      mask = createDateMask({
        inputEl,
        format: 'dd.MM.yyyy',
        initialValue: null,
        onAccept: () => {},
        onComplete: iso => completed.push(iso),
      })

      ;(mask as any).mask.value = '30.02.2026'

      expect(completed).toEqual([])
    })
  })

  describe('short year shorthand', () => {
    let inputEl: HTMLInputElement
    let mask: DateMask

    afterEach(() => {
      mask?.destroy()
      inputEl?.remove()
    })

    function setup() {
      inputEl = document.createElement('input')
      document.body.appendChild(inputEl)
      mask = createDateMask({
        inputEl,
        format: 'dd.MM.yyyy',
        initialValue: null,
        onAccept: () => {},
        onComplete: () => {},
      })
      return mask
    }

    // 00–49 is deliberately expanded to 2000–2049, so "26" is a valid shorthand for 2026.
    test('expandShortInput expands a two-digit year 00–49 to 20xx', () => {
      setup()
      inputEl.value = '01.01.26'

      expect(mask.expandShortInput()).toBe(true)
      expect(inputEl.value).toBe('01.01.2026')
    })

    // 50–99 is deliberately expanded to 1950–1999, so "76" resolves to 1976, not 2076.
    test('expandShortInput expands a two-digit year 50–99 to 19xx', () => {
      setup()
      inputEl.value = '01.01.76'

      expect(mask.expandShortInput()).toBe(true)
      expect(inputEl.value).toBe('01.01.1976')
    })

    test('expandShortInput leaves a full four-digit year untouched', () => {
      setup()
      inputEl.value = '01.01.2026'

      expect(mask.expandShortInput()).toBe(true)
      expect(inputEl.value).toBe('01.01.2026')
    })
  })
})
