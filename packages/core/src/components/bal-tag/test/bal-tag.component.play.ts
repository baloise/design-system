import { test, expect, BalTag } from '@baloise/ds-playwright'

test.describe('component', () => {
  test.beforeEach(async ({ page }) => {
    await page.mount(`
      <bal-tag closable>My tag</bal-tag>
    `)
  })

  test('should have a default slot', async ({ page }) => {
    const balTag = new BalTag(page.locator('bal-tag'))

    await balTag.assertToBeVisible()
    await balTag.assertToHaveText('My tag')
  })

  test('should fire balCloseClick event', async ({ page }) => {
    const balTag = new BalTag(page.locator('bal-tag'))
    const spy = await balTag.el.spyOnEvent('balCloseClick')

    await balTag.clickClose()

    expect(spy).toHaveReceivedEventTimes(1)
  })
})
