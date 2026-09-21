import { DsCheckbox, expect, test } from '@baloise/ds-playwright'

const GROUP = `
  <ds-checkbox-group control name="heroes" label="Label">
    <ds-checkbox value="steve-rogers">Steve Rogers</ds-checkbox>
    <ds-checkbox value="tony-stark">Tony Stark</ds-checkbox>
    <ds-checkbox value="black-widow">Black Widow</ds-checkbox>
  </ds-checkbox-group>
`

test.describe('dsChange', () => {
  test('should fire dsChange with true when checked', async ({ page }) => {
    await page.mount(`<ds-checkbox value="on">Checkbox</ds-checkbox>`)
    const checkbox = new DsCheckbox(page.locator('ds-checkbox'))
    const changeSpy = await checkbox.el.spyOnEvent('dsChange')

    await checkbox.check()

    expect(changeSpy).toHaveReceivedEventTimes(1)
    expect(changeSpy).toHaveReceivedEventDetail(true)
  })

  test('should fire dsChange with false when unchecked', async ({ page }) => {
    await page.mount(`<ds-checkbox value="on" checked>Checkbox</ds-checkbox>`)
    const checkbox = new DsCheckbox(page.locator('ds-checkbox'))
    const changeSpy = await checkbox.el.spyOnEvent('dsChange')

    await checkbox.uncheck()

    expect(changeSpy).toHaveReceivedEventTimes(1)
    expect(changeSpy).toHaveReceivedEventDetail(false)
  })
})

test.describe('dsFocus and dsBlur', () => {
  test('should fire dsFocus on focus', async ({ page }) => {
    await page.mount(`<ds-checkbox value="on">Checkbox</ds-checkbox>`)
    const checkbox = new DsCheckbox(page.locator('ds-checkbox'))
    const focusSpy = await checkbox.el.spyOnEvent('dsFocus')

    await checkbox.nativeInput.focus()

    expect(focusSpy).toHaveReceivedEventTimes(1)
  })

  test('should fire dsBlur on blur', async ({ page }) => {
    await page.mount(`<ds-checkbox value="on">Checkbox</ds-checkbox>`)
    const checkbox = new DsCheckbox(page.locator('ds-checkbox'))
    const blurSpy = await checkbox.el.spyOnEvent('dsBlur')

    await checkbox.nativeInput.focus()
    await checkbox.nativeInput.blur()

    expect(blurSpy).toHaveReceivedEventTimes(1)
  })
})

test.describe('disabled', () => {
  test('native input should be disabled', async ({ page }) => {
    await page.mount(`<ds-checkbox value="on" disabled>Checkbox</ds-checkbox>`)
    const checkbox = new DsCheckbox(page.locator('ds-checkbox'))
    const changeSpy = await checkbox.el.spyOnEvent('dsChange')

    await checkbox.assertToBeDisabled()
    expect(changeSpy).toHaveReceivedEventTimes(0)
  })

  test('should not fire dsFocus or dsBlur when disabled', async ({ page }) => {
    await page.mount(`<ds-checkbox value="on" disabled>Checkbox</ds-checkbox>`)
    const checkbox = new DsCheckbox(page.locator('ds-checkbox'))
    const focusSpy = await checkbox.el.spyOnEvent('dsFocus')
    const blurSpy = await checkbox.el.spyOnEvent('dsBlur')

    expect(focusSpy).toHaveReceivedEventTimes(0)
    expect(blurSpy).toHaveReceivedEventTimes(0)
  })
})

test.describe('readonly', () => {
  test('native input should be disabled when readonly', async ({ page }) => {
    await page.mount(`<ds-checkbox value="on" readonly>Checkbox</ds-checkbox>`)
    const checkbox = new DsCheckbox(page.locator('ds-checkbox'))

    await checkbox.assertToBeDisabled()
  })
})

test.describe('checked', () => {
  test('should reflect checked prop', async ({ page }) => {
    await page.mount(`<ds-checkbox value="on" checked>Checkbox</ds-checkbox>`)
    const checkbox = new DsCheckbox(page.locator('ds-checkbox'))

    await checkbox.assertToBeChecked()
  })

  test('should be unchecked by default', async ({ page }) => {
    await page.mount(`<ds-checkbox value="on">Checkbox</ds-checkbox>`)
    const checkbox = new DsCheckbox(page.locator('ds-checkbox'))

    await checkbox.assertToBeUnchecked()
  })
})

test.describe('form reset', () => {
  test('should reset to initial unchecked state', async ({ page }) => {
    await page.mount(`
      <form>
        <ds-checkbox name="terms" value="accepted">Accept terms</ds-checkbox>
        <button type="reset" data-testid="reset">Reset</button>
      </form>
    `)
    const checkbox = new DsCheckbox(page.locator('ds-checkbox'))

    await checkbox.check()
    await checkbox.assertToBeChecked()

    await page.getByTestId('reset').click()
    await checkbox.assertToBeUnchecked()
  })
})

test.describe('checkbox-group', () => {
  test('should fire dsChange with selected values array when a checkbox is checked', async ({ page }) => {
    await page.mount(GROUP)
    const group = page.locator('ds-checkbox-group')
    const changeSpy = await group.spyOnEvent('dsChange')
    const steve = new DsCheckbox(page.locator('ds-checkbox[value="steve-rogers"]'))

    await steve.check()

    expect(changeSpy).toHaveReceivedEventTimes(1)
    expect(changeSpy).toHaveReceivedEventDetail(['steve-rogers'])
  })

  test('should accumulate values when multiple checkboxes are checked', async ({ page }) => {
    await page.mount(GROUP)
    const group = page.locator('ds-checkbox-group')
    const changeSpy = await group.spyOnEvent('dsChange')
    const steve = new DsCheckbox(page.locator('ds-checkbox[value="steve-rogers"]'))
    const tony = new DsCheckbox(page.locator('ds-checkbox[value="tony-stark"]'))

    await steve.check()
    await tony.check()

    expect(changeSpy).toHaveReceivedEventTimes(2)
    expect(changeSpy).toHaveReceivedEventDetail(['steve-rogers', 'tony-stark'])
  })

  test('should remove value from array when a checkbox is unchecked', async ({ page }) => {
    await page.mount(`
      <ds-checkbox-group control name="heroes" label="Label" value='steve-rogers,tony-stark'>
        <ds-checkbox value="steve-rogers">Steve Rogers</ds-checkbox>
        <ds-checkbox value="tony-stark">Tony Stark</ds-checkbox>
      </ds-checkbox-group>
    `)
    const group = page.locator('ds-checkbox-group')
    const changeSpy = await group.spyOnEvent('dsChange')
    const steve = new DsCheckbox(page.locator('ds-checkbox[value="steve-rogers"]'))

    await steve.uncheck()

    expect(changeSpy).toHaveReceivedEventTimes(1)
    expect(changeSpy).toHaveReceivedEventDetail(['tony-stark'])
  })

  test('should pass disabled down to child checkboxes', async ({ page }) => {
    await page.mount(`
      <ds-checkbox-group control name="heroes" label="Label" disabled>
        <ds-checkbox value="steve-rogers">Steve Rogers</ds-checkbox>
        <ds-checkbox value="tony-stark">Tony Stark</ds-checkbox>
      </ds-checkbox-group>
    `)
    const steve = new DsCheckbox(page.locator('ds-checkbox[value="steve-rogers"]'))
    const tony = new DsCheckbox(page.locator('ds-checkbox[value="tony-stark"]'))

    await steve.assertToBeDisabled()
    await tony.assertToBeDisabled()
  })

  test('should pre-select checkboxes matching value prop', async ({ page }) => {
    await page.mount(`
      <ds-checkbox-group control name="heroes" label="Label" value="tony-stark">
        <ds-checkbox value="steve-rogers">Steve Rogers</ds-checkbox>
        <ds-checkbox value="tony-stark">Tony Stark</ds-checkbox>
      </ds-checkbox-group>
    `)
    const steve = new DsCheckbox(page.locator('ds-checkbox[value="steve-rogers"]'))
    const tony = new DsCheckbox(page.locator('ds-checkbox[value="tony-stark"]'))

    await steve.assertToBeUnchecked()
    await tony.assertToBeChecked()
  })
})
