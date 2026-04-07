import { BalHeading, test } from '@baloise/ds-playwright'

test.describe('component', () => {
  test('should have a default slot', async ({ page }) => {
    await page.mount(`
      <bal-heading>Hello World</bal-heading>
    `)

    const balHeading = new BalHeading(page.locator('bal-heading'))

    await balHeading.assertToBeVisible()
    await balHeading.assertToContainText('Hello World')
  })
})
