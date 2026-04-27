import { DsSegment, expect, test } from '@baloise/ds-playwright'

const ITEMS = `
  <ds-segment-item value="apple" label="Apple"></ds-segment-item>
  <ds-segment-item value="strawberry" label="Strawberry"></ds-segment-item>
  <ds-segment-item value="banana" label="Banana"></ds-segment-item>
`

test.describe('dsChange', () => {
  test('should fire dsChange with the selected value', async ({ page }) => {
    await page.mount(`<ds-segment name="fruits" label="Fruits">${ITEMS}</ds-segment>`)
    const segment = new DsSegment(page.locator('ds-segment'))
    const changeSpy = await segment.el.spyOnEvent('dsChange')

    await segment.select('apple')

    expect(changeSpy).toHaveReceivedEventTimes(1)
    expect(changeSpy).toHaveReceivedEventDetail('apple')
  })

  test('should fire dsChange when switching selection', async ({ page }) => {
    await page.mount(`<ds-segment name="fruits" label="Fruits" value="apple">${ITEMS}</ds-segment>`)
    const segment = new DsSegment(page.locator('ds-segment'))
    const changeSpy = await segment.el.spyOnEvent('dsChange')

    await segment.select('strawberry')

    expect(changeSpy).toHaveReceivedEventTimes(1)
    expect(changeSpy).toHaveReceivedEventDetail('strawberry')
  })

  test('should not fire dsChange when disabled', async ({ page }) => {
    await page.mount(`<ds-segment name="fruits" label="Fruits" value="apple" disabled>${ITEMS}</ds-segment>`)
    const segment = new DsSegment(page.locator('ds-segment'))
    const changeSpy = await segment.el.spyOnEvent('dsChange')

    await segment.assertToBeDisabled()
    expect(changeSpy).toHaveReceivedEventTimes(0)
  })
})

test.describe('allowEmptySelection', () => {
  test('should deselect when clicking the selected item', async ({ page }) => {
    await page.mount(
      `<ds-segment name="fruits" label="Fruits" value="apple" allow-empty-selection>${ITEMS}</ds-segment>`,
    )
    const segment = new DsSegment(page.locator('ds-segment'))
    const changeSpy = await segment.el.spyOnEvent('dsChange')

    await segment.select('apple')

    expect(changeSpy).toHaveReceivedEventTimes(1)
    await segment.assertNoSelection()
  })

  test('should not deselect without allowEmptySelection', async ({ page }) => {
    await page.mount(`<ds-segment name="fruits" label="Fruits" value="apple">${ITEMS}</ds-segment>`)
    const segment = new DsSegment(page.locator('ds-segment'))
    const changeSpy = await segment.el.spyOnEvent('dsChange')

    await segment.select('apple')

    expect(changeSpy).toHaveReceivedEventTimes(0)
    await segment.assertSelectedValue('apple')
  })
})

test.describe('value', () => {
  test('should pre-select the item matching the value prop', async ({ page }) => {
    await page.mount(`<ds-segment name="fruits" label="Fruits" value="strawberry">${ITEMS}</ds-segment>`)
    const segment = new DsSegment(page.locator('ds-segment'))

    await segment.assertSelectedValue('strawberry')
  })

  test('should have no selection when no value is set', async ({ page }) => {
    await page.mount(`<ds-segment name="fruits" label="Fruits">${ITEMS}</ds-segment>`)
    const segment = new DsSegment(page.locator('ds-segment'))

    await segment.assertNoSelection()
  })
})

test.describe('disabled', () => {
  test('all inputs should be disabled', async ({ page }) => {
    await page.mount(`<ds-segment name="fruits" label="Fruits" disabled>${ITEMS}</ds-segment>`)
    const segment = new DsSegment(page.locator('ds-segment'))

    await segment.assertToBeDisabled()
  })
})

test.describe('form reset', () => {
  test('should reset to initial value', async ({ page }) => {
    await page.mount(`
      <form>
        <ds-segment name="fruits" label="Fruits" value="apple">${ITEMS}</ds-segment>
        <button type="reset" data-testid="reset">Reset</button>
      </form>
    `)
    const segment = new DsSegment(page.locator('ds-segment'))

    await segment.select('strawberry')
    await segment.assertSelectedValue('strawberry')

    await page.getByTestId('reset').click()
    await segment.assertSelectedValue('apple')
  })

  test('should reset to no selection when initially empty', async ({ page }) => {
    await page.mount(`
      <form>
        <ds-segment name="fruits" label="Fruits">${ITEMS}</ds-segment>
        <button type="reset" data-testid="reset">Reset</button>
      </form>
    `)
    const segment = new DsSegment(page.locator('ds-segment'))

    await segment.select('banana')
    await segment.assertSelectedValue('banana')

    await page.getByTestId('reset').click()
    await segment.assertNoSelection()
  })
})
