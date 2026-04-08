import { DsDivider, test } from '@baloise/ds-playwright'

test.describe('component', () => {
  test('should be visible', async ({ page }) => {
    await page.mount(`
      <bal-divider></bal-divider>
    `)

    const dsDivider = new DsDivider(page.locator('bal-divider'))

    await dsDivider.assertToBeVisible()
  })
})
