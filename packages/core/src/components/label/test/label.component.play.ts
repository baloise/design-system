import { DsLabel, test } from '@baloise/ds-playwright'

test.describe('component', () => {
  test('should have a default slot', async ({ page }) => {
    await page.mount(`
      <ds-label>My Label</ds-label>
    `)

    const dsLabel = new DsLabel(page.locator('ds-label'))

    await dsLabel.assertToBeVisible()
    await dsLabel.assertToContainText('My Label')
  })
})
