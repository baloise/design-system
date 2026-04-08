import { Content, test } from '@baloise/ds-playwright'

test.describe('component', () => {
  test('should have a default slot', async ({ page }) => {
    await page.mount(`
      <bal-content>Hello World</bal-content>
    `)

    const dsContent = new Content(page.locator('bal-content'))

    await dsContent.assertToBeVisible()
    await dsContent.assertToContainText('Hello World')
  })
})
