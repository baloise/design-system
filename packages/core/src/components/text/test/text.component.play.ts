import { DsText, test } from '@baloise/ds-playwright'

test.describe('component', () => {
  test('should have a default slot', async ({ page }) => {
    await page.mount(`
      <ds-text>Hello World</ds-text>
    `)

    const dsText = new DsText(page.locator('ds-text'))

    await dsText.assertToBeVisible()
    await dsText.assertToContainText('Hello World')
  })
})
