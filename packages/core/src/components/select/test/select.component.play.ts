import { DsSelect, expect, test } from '@baloise/ds-playwright'

test.describe('component', () => {
  /**
   * EVENT TESTS
   */

  test('should emit dsChange when value changes', async ({ page }) => {
    await page.mount(`
      <ds-select label="Test" id="select">
        <ds-select-option value="opt1">Option 1</ds-select-option>
        <ds-select-option value="opt2">Option 2</ds-select-option>
      </ds-select>
    `)

    const select = new DsSelect(page.locator('ds-select'))
    const spy = await select.el.spyOnEvent('dsChange')

    await select.selectValue('opt2')
    await page.waitForChanges()
    expect(spy).toHaveReceivedEventTimes(1)
  })

  test('should emit dsFocus when select receives focus', async ({ page }) => {
    await page.mount(`
      <ds-select label="Test">
        <ds-select-option value="opt1">Option 1</ds-select-option>
        <ds-select-option value="opt2">Option 2</ds-select-option>
      </ds-select>
    `)

    const select = new DsSelect(page.locator('ds-select'))
    const spy = await select.el.spyOnEvent('dsFocus')

    await select.focus()
    expect(spy).toHaveReceivedEventTimes(1)
  })

  test('should emit dsBlur when select loses focus', async ({ page }) => {
    await page.mount(`
      <ds-select label="Test">
        <ds-select-option value="opt1">Option 1</ds-select-option>
        <ds-select-option value="opt2">Option 2</ds-select-option>
      </ds-select>
    `)

    const select = new DsSelect(page.locator('ds-select'))
    await select.focus()
    const spy = await select.el.spyOnEvent('dsBlur')

    await select.blur()
    expect(spy).toHaveReceivedEventTimes(1)
  })

  test('should emit dsClick when select is clicked', async ({ page }) => {
    await page.mount(`
      <ds-select label="Test">
        <ds-select-option value="opt1">Option 1</ds-select-option>
        <ds-select-option value="opt2">Option 2</ds-select-option>
      </ds-select>
    `)

    const select = new DsSelect(page.locator('ds-select'))
    const spy = await select.el.spyOnEvent('dsClick')

    await select.click()
    expect(spy).toHaveReceivedEventTimes(1)
  })

  /**
   * STATE TESTS
   */

  test('should respect disabled state', async ({ page }) => {
    await page.mount(`<ds-select label="Test" disabled></ds-select>`)

    const select = new DsSelect(page.locator('ds-select'))
    await select.assertToBeDisabled()
  })

  test('should respect required state', async ({ page }) => {
    await page.mount(`<ds-select label="Test" required></ds-select>`)

    const select = new DsSelect(page.locator('ds-select'))
    await page.waitForChanges()
    await select.assertToBeRequired()
  })

  test('should respect invalid state', async ({ page }) => {
    await page.mount(`<ds-select label="Test" invalid></ds-select>`)

    const select = new DsSelect(page.locator('ds-select'))
    await page.waitForChanges()
    await select.assertToBeInvalid()
  })

  /**
   * VALUE TESTS
   */

  test('should update value when option is selected', async ({ page }) => {
    await page.mount(`
      <ds-select label="Test" id="select">
        <ds-select-option value="opt1">Option 1</ds-select-option>
        <ds-select-option value="opt2">Option 2</ds-select-option>
      </ds-select>
    `)

    const select = new DsSelect(page.locator('ds-select'))

    await select.selectValue('opt2')
    await select.assertValue('opt2')
  })

  test('should have initial value when set', async ({ page }) => {
    await page.mount(`
      <ds-select label="Test" value="opt2">
        <ds-select-option value="opt1">Option 1</ds-select-option>
        <ds-select-option value="opt2">Option 2</ds-select-option>
      </ds-select>
    `)

    const select = new DsSelect(page.locator('ds-select'))
    await select.assertValue('opt2')
  })

  /**
   * PROPERTY TESTS
   */

  test('should display label and description', async ({ page }) => {
    await page.mount(`
      <ds-select label="Test Label" description="Test Description"></ds-select>
    `)

    const label = page.locator('label')
    const description = page.locator('[id="description"]')

    await expect(label).toContainText('Test Label')
    await expect(description).toContainText('Test Description')
  })
})
