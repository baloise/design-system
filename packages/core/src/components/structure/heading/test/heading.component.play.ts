import { DsHeading, test } from '@baloise/ds-playwright'

test.describe('component', () => {
  test('should have a default slot', async ({ page }) => {
    await page.mount(`
      <ds-heading>Hello World</ds-heading>
    `)

    const dsHeading = new DsHeading(page.locator('ds-heading'))

    await dsHeading.assertToBeVisible()
    await dsHeading.assertToContainText('Hello World')
  })
})
