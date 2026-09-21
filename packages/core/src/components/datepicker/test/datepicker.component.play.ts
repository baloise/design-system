import { DsDatepicker, expect, test } from '@baloise/ds-playwright'

test.describe('type', () => {
  test('should set value when typing a date', async ({ page }) => {
    await page.mount(`<ds-datepicker label="Date of birth"></ds-datepicker>`)
    const date = new DsDatepicker(page.locator('ds-datepicker'))

    await date.type('13.07.2026')
    await date.blur()
    await page.waitForChanges()

    await date.assertValue('13.07.2026')
  })

  test('should clear value when only the year is deleted and the field is blurred', async ({ page }) => {
    await page.mount(`<ds-datepicker label="Date of birth" value="2026-01-15"></ds-datepicker>`)
    const date = new DsDatepicker(page.locator('ds-datepicker'))
    const changeSpy = await date.el.spyOnEvent('dsChange')

    await date.nativeInput.click()
    await date.nativeInput.press('End')
    await date.nativeInput.press('Backspace')
    await date.nativeInput.press('Backspace')
    await date.nativeInput.press('Backspace')
    await date.nativeInput.press('Backspace')
    await date.blur()
    await page.waitForChanges()

    await date.assertValue('__.__.____')
    expect(changeSpy).toHaveReceivedEventDetail(null)
  })
})

test.describe('min / max', () => {
  test('should accept a date within range when typed', async ({ page }) => {
    await page.mount(`<ds-datepicker label="Label" min="2026-07-10" max="2026-07-20"></ds-datepicker>`)
    const date = new DsDatepicker(page.locator('ds-datepicker'))
    const changeSpy = await date.el.spyOnEvent('dsChange')

    await date.type('15.07.2026')
    await date.blur()
    await page.waitForChanges()

    expect(changeSpy).toHaveReceivedEventTimes(1)
    expect(changeSpy).toHaveReceivedEventDetail('2026-07-15')
    await date.assertValue('15.07.2026')
  })

  test('should reject a date below min when typed', async ({ page }) => {
    await page.mount(`<ds-datepicker label="Label" min="2026-07-10"></ds-datepicker>`)
    const date = new DsDatepicker(page.locator('ds-datepicker'))
    const changeSpy = await date.el.spyOnEvent('dsChange')

    await date.type('05.07.2026')
    await date.blur()
    await page.waitForChanges()

    expect(changeSpy).toHaveReceivedEventTimes(0)
    await date.assertValue('')
  })

  test('should reject a date above max when typed', async ({ page }) => {
    await page.mount(`<ds-datepicker label="Label" max="2026-07-20"></ds-datepicker>`)
    const date = new DsDatepicker(page.locator('ds-datepicker'))
    const changeSpy = await date.el.spyOnEvent('dsChange')

    await date.type('25.07.2026')
    await date.blur()
    await page.waitForChanges()

    expect(changeSpy).toHaveReceivedEventTimes(0)
    await date.assertValue('')
  })

  test('should accept a date within range when picked', async ({ page }) => {
    await page.mount(`<ds-datepicker label="Label" min="2026-07-01" max="2026-07-31"></ds-datepicker>`)
    const date = new DsDatepicker(page.locator('ds-datepicker'))
    const changeSpy = await date.el.spyOnEvent('dsChange')

    await date.pick('2026-07-15')
    await page.waitForChanges()

    expect(changeSpy).toHaveReceivedEventTimes(1)
    expect(changeSpy).toHaveReceivedEventDetail('2026-07-15')
    await date.assertValue('15.07.2026')
  })
})

test.describe('pick', () => {
  test('should select date via picker and emit dsChange', async ({ page }) => {
    await page.mount(`<ds-datepicker label="Date of birth"></ds-datepicker>`)
    const date = new DsDatepicker(page.locator('ds-datepicker'))
    const changeSpy = await date.el.spyOnEvent('dsChange')

    await date.pick('2026-07-13')
    await page.waitForChanges()

    expect(changeSpy).toHaveReceivedEventTimes(1)
    expect(changeSpy).toHaveReceivedEventDetail('2026-07-13')
    await date.assertValue('13.07.2026')
  })
})

test.describe('inline', () => {
  test('should emit dsChange when picking a date', async ({ page }) => {
    await page.mount(`<ds-datepicker label="Date" inline></ds-datepicker>`)
    const date = new DsDatepicker(page.locator('ds-datepicker'), { inline: true })
    const changeSpy = await date.el.spyOnEvent('dsChange')

    await date.pick('2026-07-13')
    await page.waitForChanges()

    expect(changeSpy).toHaveReceivedEventTimes(1)
    expect(changeSpy).toHaveReceivedEventDetail('2026-07-13')
    await date.assertValue('2026-07-13')
  })

  test('should emit dsBlur after dsChange when picking a date', async ({ page }) => {
    await page.mount(`<ds-datepicker label="Date" inline></ds-datepicker>`)
    const date = new DsDatepicker(page.locator('ds-datepicker'), { inline: true })
    const changeSpy = await date.el.spyOnEvent('dsChange')
    const blurSpy = await date.el.spyOnEvent('dsBlur')

    await date.pick('2026-07-13')
    await page.waitForChanges()

    expect(changeSpy).toHaveReceivedEventTimes(1)
    expect(blurSpy).toHaveReceivedEventTimes(1)
  })

  test('should not emit dsInput when picking a date', async ({ page }) => {
    await page.mount(`<ds-datepicker label="Date" inline></ds-datepicker>`)
    const date = new DsDatepicker(page.locator('ds-datepicker'), { inline: true })
    const inputSpy = await date.el.spyOnEvent('dsInput')

    await date.pick('2026-07-13')
    await page.waitForChanges()

    expect(inputSpy).toHaveReceivedEventTimes(0)
  })

  test.describe('min / max', () => {
    test('should emit dsChange when picking a date within range', async ({ page }) => {
      await page.mount(`<ds-datepicker label="Date" inline min="2026-07-01" max="2026-07-31"></ds-datepicker>`)
      const date = new DsDatepicker(page.locator('ds-datepicker'), { inline: true })
      const changeSpy = await date.el.spyOnEvent('dsChange')

      await date.pick('2026-07-15')
      await page.waitForChanges()

      expect(changeSpy).toHaveReceivedEventTimes(1)
      expect(changeSpy).toHaveReceivedEventDetail('2026-07-15')
      await date.assertValue('2026-07-15')
    })

    test('should not emit dsChange when clicking an out-of-range date', async ({ page }) => {
      await page.mount(
        `<ds-datepicker label="Date" inline min="2026-07-15" max="2026-07-31" default-date="2026-07-15"></ds-datepicker>`,
      )
      const date = new DsDatepicker(page.locator('ds-datepicker'), { inline: true })
      const changeSpy = await date.el.spyOnEvent('dsChange')

      const disabledCell = date.el.locator(
        '.air-datepicker-cell.-day-[data-year="2026"][data-month="6"][data-date="10"]',
      )
      await disabledCell.waitFor({ state: 'visible' })
      await disabledCell.click({ force: true })
      await page.waitForChanges()

      expect(changeSpy).toHaveReceivedEventTimes(0)
    })
  })

  test.describe('disabled', () => {
    test('should render as a regular disabled input instead of the calendar', async ({ page }) => {
      await page.mount(`<ds-datepicker label="Date" inline disabled value="2026-07-13"></ds-datepicker>`)
      const date = page.locator('ds-datepicker')

      // No always-visible calendar — the picker's DOM lives in the same (closed, unreachable)
      // #popup markup as a regular non-inline date, since there's no trigger to open it while
      // disabled.
      await expect(date.locator('#inline')).toHaveCount(0)
      await expect(date.locator('#popup')).toHaveAttribute('aria-hidden', 'true')
      await expect(date.locator('#input')).toBeDisabled()
      await expect(date.locator('#input')).toHaveValue('13.07.2026')
      await expect(date.locator('#trigger')).toHaveCount(0)
    })

    test('should show the calendar again once re-enabled', async ({ page }) => {
      await page.mount(`<ds-datepicker label="Date" inline disabled value="2026-07-13"></ds-datepicker>`)
      const date = page.locator('ds-datepicker')

      await date.evaluate((el: any) => (el.disabled = false))
      await page.waitForChanges()

      await expect(date.locator('#inline')).toHaveCount(1)
      await expect(date.locator('#input')).toHaveCount(0)
    })
  })
})
