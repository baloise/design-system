import { DsToggle, expect, test } from '@baloise/ds-playwright'

test.describe('dsChange', () => {
  test('should fire dsChange with true when checked', async ({ page }) => {
    await page.mount(`<ds-toggle value="on">Toggle</ds-toggle>`)
    const toggle = new DsToggle(page.locator('ds-toggle'))
    const changeSpy = await toggle.el.spyOnEvent('dsChange')

    await toggle.check()

    expect(changeSpy).toHaveReceivedEventTimes(1)
    expect(changeSpy).toHaveReceivedEventDetail(true)
  })

  test('should fire dsChange with false when unchecked', async ({ page }) => {
    await page.mount(`<ds-toggle value="on" checked>Toggle</ds-toggle>`)
    const toggle = new DsToggle(page.locator('ds-toggle'))
    const changeSpy = await toggle.el.spyOnEvent('dsChange')

    await toggle.uncheck()

    expect(changeSpy).toHaveReceivedEventTimes(1)
    expect(changeSpy).toHaveReceivedEventDetail(false)
  })
})

test.describe('dsFocus and dsBlur', () => {
  test('should fire dsFocus on focus', async ({ page }) => {
    await page.mount(`<ds-toggle value="on">Toggle</ds-toggle>`)
    const toggle = new DsToggle(page.locator('ds-toggle'))
    const focusSpy = await toggle.el.spyOnEvent('dsFocus')

    await toggle.nativeInput.focus()

    expect(focusSpy).toHaveReceivedEventTimes(1)
  })

  test('should fire dsBlur on blur', async ({ page }) => {
    await page.mount(`<ds-toggle value="on">Toggle</ds-toggle>`)
    const toggle = new DsToggle(page.locator('ds-toggle'))
    const blurSpy = await toggle.el.spyOnEvent('dsBlur')

    await toggle.nativeInput.focus()
    await toggle.nativeInput.blur()

    expect(blurSpy).toHaveReceivedEventTimes(1)
  })
})

test.describe('disabled', () => {
  test('native input should be disabled', async ({ page }) => {
    await page.mount(`<ds-toggle value="on" disabled>Toggle</ds-toggle>`)
    const toggle = new DsToggle(page.locator('ds-toggle'))
    const changeSpy = await toggle.el.spyOnEvent('dsChange')

    await toggle.assertToBeDisabled()
    expect(changeSpy).toHaveReceivedEventTimes(0)
  })

  test('should not fire dsFocus or dsBlur when disabled', async ({ page }) => {
    await page.mount(`<ds-toggle value="on" disabled>Toggle</ds-toggle>`)
    const toggle = new DsToggle(page.locator('ds-toggle'))
    const focusSpy = await toggle.el.spyOnEvent('dsFocus')
    const blurSpy = await toggle.el.spyOnEvent('dsBlur')

    expect(focusSpy).toHaveReceivedEventTimes(0)
    expect(blurSpy).toHaveReceivedEventTimes(0)
  })
})

test.describe('readonly', () => {
  test('native input should be disabled when readonly', async ({ page }) => {
    await page.mount(`<ds-toggle value="on" readonly>Toggle</ds-toggle>`)
    const toggle = new DsToggle(page.locator('ds-toggle'))

    await toggle.assertToBeDisabled()
  })
})

test.describe('checked', () => {
  test('should reflect checked prop', async ({ page }) => {
    await page.mount(`<ds-toggle value="on" checked>Toggle</ds-toggle>`)
    const toggle = new DsToggle(page.locator('ds-toggle'))

    await toggle.assertToBeChecked()
  })

  test('should be unchecked by default', async ({ page }) => {
    await page.mount(`<ds-toggle value="on">Toggle</ds-toggle>`)
    const toggle = new DsToggle(page.locator('ds-toggle'))

    await toggle.assertToBeUnchecked()
  })
})

test.describe('form reset', () => {
  test('should reset to initial checked state', async ({ page }) => {
    await page.mount(`
      <form>
        <ds-toggle name="terms" value="accepted">Accept terms</ds-toggle>
        <button type="reset" data-testid="reset">Reset</button>
      </form>
    `)
    const toggle = new DsToggle(page.locator('ds-toggle'))

    await toggle.check()
    await toggle.assertToBeChecked()

    await page.getByTestId('reset').click()
    await toggle.assertToBeUnchecked()
  })
})
