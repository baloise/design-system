import { DsInput, expect, test } from '@baloise/ds-playwright'

test.describe('component', () => {
  test('should fire dsInput on fill', async ({ page }) => {
    await page.mount(`<ds-input label="Label"></ds-input>`)
    const input = new DsInput(page.locator('ds-input'))
    const inputSpy = await input.el.spyOnEvent('dsInput')

    await input.fill('hello')

    expect(inputSpy).toHaveReceivedEventTimes(1)
    expect(inputSpy).toHaveReceivedEventDetail('hello')
  })

  test('should fire dsChange with value on blur', async ({ page }) => {
    await page.mount(`<ds-input label="Label"></ds-input>`)
    const input = new DsInput(page.locator('ds-input'))
    const changeSpy = await input.el.spyOnEvent('dsChange')

    await input.fill('hello')
    await input.blur()

    expect(changeSpy).toHaveReceivedEventTimes(1)
    expect(changeSpy).toHaveReceivedEventDetail('hello')
  })

  test('should not fire dsChange when value is unchanged on blur', async ({ page }) => {
    await page.mount(`<ds-input label="Label" value="hello"></ds-input>`)
    const input = new DsInput(page.locator('ds-input'))
    const changeSpy = await input.el.spyOnEvent('dsChange')

    await input.nativeInput.focus()
    await input.blur()

    expect(changeSpy).toHaveReceivedEventTimes(0)
  })
})

test.describe('disabled', () => {
  test('native input should be disabled', async ({ page }) => {
    await page.mount(`<ds-input label="Label" value="Fixed" disabled></ds-input>`)
    const input = new DsInput(page.locator('ds-input'))
    const inputSpy = await input.el.spyOnEvent('dsInput')

    await input.assertToBeDisabled()
    expect(inputSpy).toHaveReceivedEventTimes(0)
  })
})

test.describe('form reset', () => {
  test('should reset to initial value', async ({ page }) => {
    await page.mount(`
      <form>
        <ds-input name="hero" label="Hero" value="Steve Rogers"></ds-input>
        <button type="reset" data-testid="reset">Reset</button>
      </form>
    `)
    const input = new DsInput(page.locator('ds-input'))
    const changeSpy = await input.el.spyOnEvent('dsChange')

    await input.fill('Tony Stark')
    await input.blur()
    expect(changeSpy).toHaveReceivedEventTimes(1)
    expect(changeSpy).toHaveReceivedEventDetail('Tony Stark')

    await page.getByTestId('reset').click()
    await input.assertValue('Steve Rogers')
  })
})

test.describe('formatter', () => {
  test('vehicle-registration-number: formats digits and emits formatted value', async ({ page }) => {
    await page.mount(`<ds-input label="VRN" mask="vehicle-registration-number"></ds-input>`)
    const input = new DsInput(page.locator('ds-input'))
    const inputSpy = await input.el.spyOnEvent('dsInput')
    const changeSpy = await input.el.spyOnEvent('dsChange')

    await input.fill('123456789')
    await input.assertValue('123.456.789')
    expect(inputSpy).toHaveReceivedEventTimes(1)
    expect(inputSpy).toHaveReceivedEventDetail('123.456.789')

    await input.blur()
    expect(changeSpy).toHaveReceivedEventTimes(1)
    expect(changeSpy).toHaveReceivedEventDetail('123.456.789')
  })

  test('vehicle-registration-number: pre-filled value is displayed formatted', async ({ page }) => {
    await page.mount(`<ds-input label="VRN" mask="vehicle-registration-number" value="123456789"></ds-input>`)
    const input = new DsInput(page.locator('ds-input'))
    await input.assertValue('123.456.789')
  })

  test('contract-number: formats digits and emits formatted value', async ({ page }) => {
    await page.mount(`<ds-input label="Contract" mask="contract-number"></ds-input>`)
    const input = new DsInput(page.locator('ds-input'))
    const inputSpy = await input.el.spyOnEvent('dsInput')
    const changeSpy = await input.el.spyOnEvent('dsChange')

    await input.fill('9087654321')
    await input.assertValue('90/8.765.432-1')
    expect(inputSpy).toHaveReceivedEventTimes(1)
    expect(inputSpy).toHaveReceivedEventDetail('90/8.765.432-1')

    await input.blur()
    expect(changeSpy).toHaveReceivedEventTimes(1)
    expect(changeSpy).toHaveReceivedEventDetail('90/8.765.432-1')
  })

  test('claim-number: formats digits and emits formatted value', async ({ page }) => {
    await page.mount(`<ds-input label="Claim" mask="claim-number"></ds-input>`)
    const input = new DsInput(page.locator('ds-input'))
    const inputSpy = await input.el.spyOnEvent('dsInput')
    const changeSpy = await input.el.spyOnEvent('dsChange')

    await input.fill('73001217169')
    await input.assertValue('73/001217/16.9')
    expect(inputSpy).toHaveReceivedEventTimes(1)
    expect(inputSpy).toHaveReceivedEventDetail('73/001217/16.9')

    await input.blur()
    expect(changeSpy).toHaveReceivedEventTimes(1)
    expect(changeSpy).toHaveReceivedEventDetail('73/001217/16.9')
  })

  test('be-iban: formats digits and emits formatted value', async ({ page }) => {
    await page.mount(`<ds-input label="IBAN" mask="be-iban"></ds-input>`)
    const input = new DsInput(page.locator('ds-input'))
    const inputSpy = await input.el.spyOnEvent('dsInput')
    const changeSpy = await input.el.spyOnEvent('dsChange')

    await input.fill('68539007547034')
    await input.assertValue('BE68 5390 0754 7034')
    expect(inputSpy).toHaveReceivedEventTimes(1)
    expect(inputSpy).toHaveReceivedEventDetail('BE68 5390 0754 7034')

    await input.blur()
    expect(changeSpy).toHaveReceivedEventTimes(1)
    expect(changeSpy).toHaveReceivedEventDetail('BE68 5390 0754 7034')
  })
})
