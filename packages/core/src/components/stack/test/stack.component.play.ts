import { BalStack, test } from '@baloise/ds-playwright'

test.describe('component', () => {
  test('should have a default slot', async ({ page }) => {
    await page.mount(`
      <bal-stack>Hello World</bal-stack>
    `)

    const balStack = new BalStack(page.locator('bal-stack'))

    await balStack.assertToBeVisible()
    await balStack.assertToContainText('Hello World')
  })
})
