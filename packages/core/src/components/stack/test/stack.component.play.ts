import { Stack, test } from '@baloise/ds-playwright'

test.describe('component', () => {
  test('should have a default slot', async ({ page }) => {
    await page.mount(`
      <bal-stack>Hello World</bal-stack>
    `)

    const dsStack = new Stack(page.locator('bal-stack'))

    await dsStack.assertToBeVisible()
    await dsStack.assertToContainText('Hello World')
  })
})
