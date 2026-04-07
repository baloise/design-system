import { BalClose, test } from '@baloise/ds-playwright'

test.describe('component', () => {
  test('should be visible', async ({ page }) => {
    await page.mount(`
      <bal-close></bal-close>
    `)

    const balClose = new BalClose(page.locator('bal-close'))

    await balClose.assertToBeVisible()
  })

  test('should click', async ({ page }) => {
    await page.mount(`
      <bal-close></bal-close>
    `)

    const balClose = new BalClose(page.locator('bal-close'))

    await balClose.click()
  })
})
