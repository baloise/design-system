import { BalText, test } from '@baloise/ds-playwright'

test.describe('component', () => {
  test('should have a default slot', async ({ page }) => {
    await page.mount(`
      <bal-text>Hello World</bal-text>
    `)

    const balText = new BalText(page.locator('bal-text'))

    await balText.assertToBeVisible()
    await balText.assertToContainText('Hello World')
  })
})
