import { test, expect } from '@baloise/ds-playwright'

test.describe('component', () => {
  test.beforeEach(async ({ page }) => {
    await page.mount(`
      <bal-tag closable>My tag</bal-tag>
    `)
  })

  test('should have a default slot', async ({ page }) => {
    const balTag = await page.locator('bal-tag')
    await expect(balTag).toContainText('My tag')
  })

  test('should fire balCloseClick event', async ({ page }) => {
    const balTag = await page.locator('bal-tag')
    const spy = await balTag.spyOnEvent('balCloseClick')

    await balTag.getByTestId('bal-tag-close').click()

    expect(spy).toHaveReceivedEventTimes(1)
  })
})
