import { Button, expect, test } from '@baloise/ds-playwright'

test.describe('component', () => {
  test('should have a default slot', async ({ page }) => {
    await page.mount(`
      <bal-button>Click me</bal-button>
    `)

    const dsButton = new Button(page.locator('bal-button'))

    await dsButton.assertToBeVisible()
    await dsButton.assertToContainText('Click me')
  })

  test('should fire dsClick event', async ({ page }) => {
    await page.mount(`
      <bal-button>Click me</bal-button>
    `)

    const dsButton = new Button(page.locator('bal-button'))
    const spy = await dsButton.el.spyOnEvent('dsClick')

    await dsButton.click()

    expect(spy).toHaveReceivedEventTimes(1)
  })

  test('should not fire dsClick when disabled', async ({ page }) => {
    await page.mount(`
      <bal-button disabled>Disabled</bal-button>
    `)
    const dsButton = new Button(page.locator('bal-button'))
    const spy = await dsButton.el.spyOnEvent('dsClick')

    await dsButton.assertToBeDisabled()

    expect(spy).toHaveReceivedEventTimes(0)
  })
})
