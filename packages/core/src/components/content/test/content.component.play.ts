import { BalContent, test } from '@baloise/ds-playwright'

test.describe('component', () => {
  test('should have a default slot', async ({ page }) => {
    await page.mount(`
      <bal-content>Hello World</bal-content>
    `)

    const balContent = new BalContent(page.locator('bal-content'))

    await balContent.assertToBeVisible()
    await balContent.assertToContainText('Hello World')
  })
})
