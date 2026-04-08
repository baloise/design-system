import { Label, test } from '@baloise/ds-playwright'

test.describe('component', () => {
  test('should have a default slot', async ({ page }) => {
    await page.mount(`
      <bal-label>My Label</bal-label>
    `)

    const dsLabel = new Label(page.locator('bal-label'))

    await dsLabel.assertToBeVisible()
    await dsLabel.assertToContainText('My Label')
  })
})
