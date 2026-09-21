import { DsContent, test } from '@baloise/ds-playwright'

test.describe('component', () => {
  test('should have a default slot', async ({ page }) => {
    await page.mount(`
      <ds-content>Hello World</ds-content>
    `)

    const dsContent = new DsContent(page.locator('ds-content'))

    await dsContent.assertToBeVisible()
    await dsContent.assertToContainText('Hello World')
  })
})
