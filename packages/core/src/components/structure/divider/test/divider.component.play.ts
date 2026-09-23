import { DsDivider, test } from '@helvetia-design/playwright'

test.describe('component', () => {
  test('should be visible', async ({ page }) => {
    await page.mount(`
      <ds-divider></ds-divider>
    `)

    const dsDivider = new DsDivider(page.locator('ds-divider'))

    await dsDivider.assertToBeVisible()
  })
})
