import { Heading, test } from '@baloise/ds-playwright'

test.describe('component', () => {
  test('should have a default slot', async ({ page }) => {
    await page.mount(`
      <bal-heading>Hello World</bal-heading>
    `)

    const dsHeading = new Heading(page.locator('bal-heading'))

    await dsHeading.assertToBeVisible()
    await dsHeading.assertToContainText('Hello World')
  })
})
