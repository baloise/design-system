import { DsNumberInput, expect, test } from '@baloise/ds-playwright'

test.describe('component', () => {
  test('should fire dsInput with numeric value on fill', async ({ page }) => {
    await page.mount(`<ds-number-input label="Label"></ds-number-input>`)
    const input = new DsNumberInput(page.locator('ds-number-input'))
    const inputSpy = await input.el.spyOnEvent('dsInput')

    await input.fill('42')

    expect(inputSpy).toHaveReceivedEventTimes(1)
    expect(inputSpy).toHaveReceivedEventDetail(42)
  })

  test('should fire dsChange with numeric value on blur', async ({ page }) => {
    await page.mount(`<ds-number-input label="Label"></ds-number-input>`)
    const input = new DsNumberInput(page.locator('ds-number-input'))
    const changeSpy = await input.el.spyOnEvent('dsChange')

    await input.fill('100')
    await input.blur()

    expect(changeSpy).toHaveReceivedEventTimes(1)
    expect(changeSpy).toHaveReceivedEventDetail(100)
  })

  test('should not fire dsChange when value is unchanged on blur', async ({ page }) => {
    await page.mount(`<ds-number-input label="Label" value="42"></ds-number-input>`)
    const input = new DsNumberInput(page.locator('ds-number-input'))
    const changeSpy = await input.el.spyOnEvent('dsChange')

    await input.nativeInput.focus()
    await input.blur()

    expect(changeSpy).toHaveReceivedEventTimes(0)
  })
})

test.describe('decimal', () => {
  test('should emit decimal value when decimal="2"', async ({ page }) => {
    await page.mount(`<ds-number-input label="Label" decimal="2"></ds-number-input>`)
    const input = new DsNumberInput(page.locator('ds-number-input'))
    const changeSpy = await input.el.spyOnEvent('dsChange')

    await input.fill('42.5')
    await input.blur()

    expect(changeSpy).toHaveReceivedEventDetail(42.5)
  })

  test('should emit null for empty input with decimal="2"', async ({ page }) => {
    await page.mount(`<ds-number-input label="Label" decimal="2"></ds-number-input>`)
    const input = new DsNumberInput(page.locator('ds-number-input'))
    const changeSpy = await input.el.spyOnEvent('dsChange')

    await input.nativeInput.focus()
    await input.blur()

    expect(changeSpy).toHaveReceivedEventTimes(0)
  })
})

test.describe('onlyPositive', () => {
  test('should block negative sign when onlyPositive', async ({ page }) => {
    await page.mount(`<ds-number-input label="Label" only-positive></ds-number-input>`)
    const input = new DsNumberInput(page.locator('ds-number-input'))

    await input.nativeInput.focus()
    await input.nativeInput.press('-')
    await input.nativeInput.type('5')
    await input.blur()

    await input.assertValue('5')
  })
})

test.describe('exactNumber', () => {
  test('should display 0 when empty and exactNumber is set', async ({ page }) => {
    await page.mount(`<ds-number-input label="Label" exact-number></ds-number-input>`)
    const input = new DsNumberInput(page.locator('ds-number-input'))

    await input.assertValue('0')
  })
})

test.describe('disabled', () => {
  test('native input should be disabled', async ({ page }) => {
    await page.mount(`<ds-number-input label="Label" value="42" disabled></ds-number-input>`)
    const input = new DsNumberInput(page.locator('ds-number-input'))
    const inputSpy = await input.el.spyOnEvent('dsInput')

    await input.assertToBeDisabled()
    expect(inputSpy).toHaveReceivedEventTimes(0)
  })
})

test.describe('form reset', () => {
  test('should reset to initial value', async ({ page }) => {
    await page.mount(`
      <form>
        <ds-number-input name="amount" label="Amount" value="100"></ds-number-input>
        <button type="reset" data-testid="reset">Reset</button>
      </form>
    `)
    const input = new DsNumberInput(page.locator('ds-number-input'))
    const changeSpy = await input.el.spyOnEvent('dsChange')

    await input.fill('999')
    await input.blur()
    expect(changeSpy).toHaveReceivedEventTimes(1)
    expect(changeSpy).toHaveReceivedEventDetail(999)

    await page.getByTestId('reset').click()
    expect(changeSpy).toHaveReceivedEventDetail(100)
  })
})
