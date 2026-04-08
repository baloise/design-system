import { DsText, test } from '@baloise/ds-playwright'

test.describe('component', () => {
  test('should have a default slot', async ({ page }) => {
    await page.mount(`
      <bal-text>Hello World</bal-text>
    `)

    const dsText = new DsText(page.locator('bal-text'))

    await dsText.assertToBeVisible()
    await dsText.assertToContainText('Hello World')
  })
})
