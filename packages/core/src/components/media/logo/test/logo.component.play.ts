import { DsLogo, test } from '@baloise/ds-playwright'

test.describe('component', () => {
  test('should be visible', async ({ page }) => {
    await page.mount(`
      <ds-logo></ds-logo>
    `)

    const dsLogo = new DsLogo(page.locator('ds-logo'))

    await dsLogo.assertToBeVisible()
  })
})
