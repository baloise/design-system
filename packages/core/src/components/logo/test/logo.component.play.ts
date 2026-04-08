import { BalLogo, test } from '@baloise/ds-playwright'

test.describe('component', () => {
  test('should be visible', async ({ page }) => {
    await page.mount(`
      <bal-logo></bal-logo>
    `)

    const balLogo = new BalLogo(page.locator('bal-logo'))

    await balLogo.assertToBeVisible()
  })
})
