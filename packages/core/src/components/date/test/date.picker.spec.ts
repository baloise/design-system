import { describe, test, expect, afterEach } from 'vitest'
import { checkIsWithinRange, DatePickerController } from '../date.picker'

describe('dsDate', () => {
  describe('checkIsWithinRange', () => {
    test('accepts a historical date (before June 1894) with no min/max configured', () => {
      expect(checkIsWithinRange('1800-02-01', undefined, undefined, undefined, undefined, undefined)).toBe(true)
    })
  })

  describe('DatePickerController', () => {
    let host: HTMLDivElement
    let controller: DatePickerController

    afterEach(() => {
      controller?.destroy()
      host?.remove()
    })

    function setup(initialValue: string | null = null) {
      host = document.createElement('div')
      document.body.appendChild(host)
      const shadowRoot = host.attachShadow({ mode: 'open' })
      const popupHostEl = document.createElement('div')
      shadowRoot.appendChild(popupHostEl)

      let selected: string | null | undefined
      controller = new DatePickerController({
        popupHostEl,
        shadowRoot,
        language: 'de',
        region: 'CH',
        min: undefined,
        max: undefined,
        minYear: undefined,
        maxYear: undefined,
        defaultDate: undefined,
        allowedDates: undefined,
        initialValue,
        onSelect: iso => {
          selected = iso
        },
        onClose: () => {},
      })

      return {
        popupHostEl,
        getSelected: () => selected,
        airDatepicker: () => (controller as any).airDatepicker,
      }
    }

    // Bug: https://github.com/baloise/design-system/issues/2209
    test('selecting a date before June 1894 does not shift it by a day', async () => {
      const { getSelected, airDatepicker } = setup()

      await airDatepicker().selectDate(new Date(1800, 1, 1))

      expect(getSelected()).toBe('1800-02-01')
    })

    test('selecting a modern date resolves to the correct ISO value', async () => {
      const { getSelected, airDatepicker } = setup()

      await airDatepicker().selectDate(new Date(2024, 0, 15))

      expect(getSelected()).toBe('2024-01-15')
    })

    // Bug: https://github.com/baloise/design-system/issues/2209
    test('syncFromValue navigates the calendar view to the new value, even across a year boundary', () => {
      const { airDatepicker } = setup('2024-01-01')

      controller.syncFromValue('2025-01-01')

      const viewDate = airDatepicker().viewDate as Date
      expect(viewDate.getFullYear()).toBe(2025)
      expect(viewDate.getMonth()).toBe(0)
    })
  })
})
