import { BalLabel, test } from '@baloise/ds-playwright'

test.describe('component', () => {
  test('should have a default slot', async ({ page }) => {
    await page.mount(`
      <bal-label>My Label</bal-label>
    `)

    const balLabel = new BalLabel(page.locator('bal-label'))

    await balLabel.assertToBeVisible()
    await balLabel.assertToContainText('My Label')
  })
})
