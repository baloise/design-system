import { DsRadio, expect, test } from '@baloise/ds-playwright'

const GROUP = `
  <ds-radio-group name="heroes" label="Label">
    <ds-radio value="steve-rogers">Steve Rogers</ds-radio>
    <ds-radio value="tony-stark">Tony Stark</ds-radio>
    <ds-radio value="black-widow">Black Widow</ds-radio>
  </ds-radio-group>
`

test.describe('dsChange', () => {
  test('should fire dsChange with true when selected', async ({ page }) => {
    await page.mount(`<ds-radio value="option-1">Option 1</ds-radio>`)
    const radio = new DsRadio(page.locator('ds-radio'))
    const changeSpy = await radio.el.spyOnEvent('dsChange')

    await radio.select()

    expect(changeSpy).toHaveReceivedEventTimes(1)
    expect(changeSpy).toHaveReceivedEventDetail(true)
  })
})

test.describe('dsFocus and dsBlur', () => {
  test('should fire dsFocus on focus', async ({ page }) => {
    await page.mount(`<ds-radio value="option-1">Option 1</ds-radio>`)
    const radio = new DsRadio(page.locator('ds-radio'))
    const focusSpy = await radio.el.spyOnEvent('dsFocus')

    await radio.nativeInput.focus()

    expect(focusSpy).toHaveReceivedEventTimes(1)
  })

  test('should fire dsBlur on blur', async ({ page }) => {
    await page.mount(`<ds-radio value="option-1">Option 1</ds-radio>`)
    const radio = new DsRadio(page.locator('ds-radio'))
    const blurSpy = await radio.el.spyOnEvent('dsBlur')

    await radio.nativeInput.focus()
    await radio.nativeInput.blur()

    expect(blurSpy).toHaveReceivedEventTimes(1)
  })
})

test.describe('disabled', () => {
  test('native input should be disabled', async ({ page }) => {
    await page.mount(`<ds-radio value="option-1" disabled>Option 1</ds-radio>`)
    const radio = new DsRadio(page.locator('ds-radio'))
    const changeSpy = await radio.el.spyOnEvent('dsChange')

    await radio.assertToBeDisabled()
    expect(changeSpy).toHaveReceivedEventTimes(0)
  })
})

test.describe('readonly', () => {
  test('native input should be disabled when readonly', async ({ page }) => {
    await page.mount(`<ds-radio value="option-1" readonly>Option 1</ds-radio>`)
    const radio = new DsRadio(page.locator('ds-radio'))

    await radio.assertToBeDisabled()
  })
})

test.describe('checked', () => {
  test('should reflect checked prop', async ({ page }) => {
    await page.mount(`<ds-radio value="option-1" checked>Option 1</ds-radio>`)
    const radio = new DsRadio(page.locator('ds-radio'))

    await radio.assertToBeChecked()
  })

  test('should be unchecked by default', async ({ page }) => {
    await page.mount(`<ds-radio value="option-1">Option 1</ds-radio>`)
    const radio = new DsRadio(page.locator('ds-radio'))

    await radio.assertToBeUnchecked()
  })
})

test.describe('radio-group', () => {
  test('should fire dsChange with selected value when a radio is clicked', async ({ page }) => {
    await page.mount(GROUP)
    const group = page.locator('ds-radio-group')
    const changeSpy = await group.spyOnEvent('dsChange')
    const steve = new DsRadio(page.locator('ds-radio[value="steve-rogers"]'))

    await steve.select()

    expect(changeSpy).toHaveReceivedEventTimes(1)
    expect(changeSpy).toHaveReceivedEventDetail('steve-rogers')
  })

  test('should update selected value when a different radio is clicked', async ({ page }) => {
    await page.mount(GROUP)
    const group = page.locator('ds-radio-group')
    const changeSpy = await group.spyOnEvent('dsChange')
    const steve = new DsRadio(page.locator('ds-radio[value="steve-rogers"]'))
    const tony = new DsRadio(page.locator('ds-radio[value="tony-stark"]'))

    await steve.select()
    await tony.select()

    expect(changeSpy).toHaveReceivedEventTimes(2)
    expect(changeSpy).toHaveReceivedEventDetail('tony-stark')
  })

  test('should pre-select radio matching value prop', async ({ page }) => {
    await page.mount(`
      <ds-radio-group name="heroes" label="Label" value="tony-stark">
        <ds-radio value="steve-rogers">Steve Rogers</ds-radio>
        <ds-radio value="tony-stark">Tony Stark</ds-radio>
      </ds-radio-group>
    `)
    const steve = new DsRadio(page.locator('ds-radio[value="steve-rogers"]'))
    const tony = new DsRadio(page.locator('ds-radio[value="tony-stark"]'))

    await steve.assertToBeUnchecked()
    await tony.assertToBeChecked()
  })

  test('should pass disabled down to child radios', async ({ page }) => {
    await page.mount(`
      <ds-radio-group name="heroes" label="Label" disabled>
        <ds-radio value="steve-rogers">Steve Rogers</ds-radio>
        <ds-radio value="tony-stark">Tony Stark</ds-radio>
      </ds-radio-group>
    `)
    const steve = new DsRadio(page.locator('ds-radio[value="steve-rogers"]'))
    const tony = new DsRadio(page.locator('ds-radio[value="tony-stark"]'))

    await steve.assertToBeDisabled()
    await tony.assertToBeDisabled()
  })

  test('should navigate with arrow keys', async ({ page }) => {
    await page.mount(GROUP)
    const group = page.locator('ds-radio-group')
    const changeSpy = await group.spyOnEvent('dsChange')
    const steve = new DsRadio(page.locator('ds-radio[value="steve-rogers"]'))

    await steve.nativeInput.focus()
    await page.keyboard.press('ArrowDown')

    expect(changeSpy).toHaveReceivedEventTimes(1)
    expect(changeSpy).toHaveReceivedEventDetail('tony-stark')
  })

  test('should reset to initial value on form reset', async ({ page }) => {
    await page.mount(`
      <form>
        <ds-radio-group name="heroes" label="Label" value="steve-rogers">
          <ds-radio value="steve-rogers">Steve Rogers</ds-radio>
          <ds-radio value="tony-stark">Tony Stark</ds-radio>
        </ds-radio-group>
        <button type="reset" data-testid="reset">Reset</button>
      </form>
    `)
    const tony = new DsRadio(page.locator('ds-radio[value="tony-stark"]'))
    const steve = new DsRadio(page.locator('ds-radio[value="steve-rogers"]'))

    await tony.select()
    await tony.assertToBeChecked()

    await page.getByTestId('reset').click()
    await steve.assertToBeChecked()
    await tony.assertToBeUnchecked()
  })
})
