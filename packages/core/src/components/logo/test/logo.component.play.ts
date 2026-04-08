import { Logo, test } from '@baloise/ds-playwright'

test.describe('component', () => {
  test('should be visible', async ({ page }) => {
    await page.mount(`
      <bal-logo></bal-logo>
    `)

    const dsLogo = new Logo(page.locator('bal-logo'))

    await dsLogo.assertToBeVisible()
  })
})
