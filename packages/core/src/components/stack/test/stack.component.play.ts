import { DsStack, test } from '@baloise/ds-playwright'

test.describe('component', () => {
  test('should have a default slot', async ({ page }) => {
    await page.mount(`
      <ds-stack>Hello World</ds-stack>
    `)

    const dsStack = new DsStack(page.locator('ds-stack'))

    await dsStack.assertToBeVisible()
    await dsStack.assertToContainText('Hello World')
  })
})
