import { BalSpinner, test } from '@baloise/ds-playwright'

test.describe('component', () => {
  test('should be visible', async ({ page }) => {
    await page.mount(`
      <bal-spinner></bal-spinner>
    `)

    const balSpinner = new BalSpinner(page.locator('bal-spinner'))

    await balSpinner.assertToBeVisible()
  })
})
