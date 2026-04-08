import { BalShape, test } from '@baloise/ds-playwright'

test.describe('component', () => {
  test('should be visible', async ({ page }) => {
    await page.mount(`
      <bal-shape></bal-shape>
    `)

    const balShape = new BalShape(page.locator('bal-shape'))

    await balShape.assertToBeVisible()
  })
})
