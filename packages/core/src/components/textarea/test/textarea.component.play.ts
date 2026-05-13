import { DsTextarea, expect, test } from '@baloise/ds-playwright'

test.describe('component', () => {
  test('should fire dsInput on fill', async ({ page }) => {
    await page.mount(`<ds-textarea label="Label"></ds-textarea>`)
    const textarea = new DsTextarea(page.locator('ds-textarea'))
    const inputSpy = await textarea.el.spyOnEvent('dsInput')

    await textarea.fill('hello')

    expect(inputSpy).toHaveReceivedEventTimes(1)
    expect(inputSpy).toHaveReceivedEventDetail('hello')
  })

  test('should fire dsChange with value on blur', async ({ page }) => {
    await page.mount(`<ds-textarea label="Label"></ds-textarea>`)
    const textarea = new DsTextarea(page.locator('ds-textarea'))
    const changeSpy = await textarea.el.spyOnEvent('dsChange')

    await textarea.fill('hello')
    await textarea.blur()

    expect(changeSpy).toHaveReceivedEventTimes(1)
    expect(changeSpy).toHaveReceivedEventDetail('hello')
  })

  test('should not fire dsChange when value is unchanged on blur', async ({ page }) => {
    await page.mount(`<ds-textarea label="Label" value="hello"></ds-textarea>`)
    const textarea = new DsTextarea(page.locator('ds-textarea'))
    const changeSpy = await textarea.el.spyOnEvent('dsChange')

    await textarea.nativeTextarea.focus()
    await textarea.blur()

    expect(changeSpy).toHaveReceivedEventTimes(0)
  })
})

test.describe('disabled', () => {
  test('native textarea should be disabled', async ({ page }) => {
    await page.mount(`<ds-textarea label="Label" value="Fixed" disabled></ds-textarea>`)
    const textarea = new DsTextarea(page.locator('ds-textarea'))
    const inputSpy = await textarea.el.spyOnEvent('dsInput')

    await textarea.assertToBeDisabled()
    expect(inputSpy).toHaveReceivedEventTimes(0)
  })
})

test.describe('form reset', () => {
  test('should reset to initial value', async ({ page }) => {
    await page.mount(`
      <form>
        <ds-textarea name="notes" label="Notes" value="Initial value"></ds-textarea>
        <button type="reset" data-testid="reset">Reset</button>
      </form>
    `)
    const textarea = new DsTextarea(page.locator('ds-textarea'))
    const changeSpy = await textarea.el.spyOnEvent('dsChange')

    await textarea.fill('Changed value')
    await textarea.blur()
    expect(changeSpy).toHaveReceivedEventTimes(1)
    expect(changeSpy).toHaveReceivedEventDetail('Changed value')

    await page.getByTestId('reset').click()
    await textarea.assertValue('Initial value')
  })
})
