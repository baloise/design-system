import { BalButton, expect, test } from '@baloise/ds-playwright'

test.describe('component', () => {
  test('should have a default slot', async ({ page }) => {
    await page.mount(`
      <bal-button>Click me</bal-button>
    `)

    const balButton = new BalButton(page.locator('bal-button'))

    await balButton.assertToBeVisible()
    await balButton.assertToContainText('Click me')
  })

  test('should fire balClick event', async ({ page }) => {
    await page.mount(`
      <bal-button>Click me</bal-button>
    `)

    const balButton = new BalButton(page.locator('bal-button'))
    const spy = await balButton.el.spyOnEvent('balClick')

    await balButton.click()

    expect(spy).toHaveReceivedEventTimes(1)
  })

  test('should not fire balClick when disabled', async ({ page }) => {
    await page.mount(`
      <bal-button disabled>Disabled</bal-button>
    `)
    const balButton = new BalButton(page.locator('bal-button'))
    const spy = await balButton.el.spyOnEvent('balClick')

    await balButton.assertToBeDisabled()

    expect(spy).toHaveReceivedEventTimes(0)
  })
})
