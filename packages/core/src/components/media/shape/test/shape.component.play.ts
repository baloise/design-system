import { DsShape, test } from '@helvetia-design/playwright'

test.describe('component', () => {
  test('should be visible', async ({ page }) => {
    await page.mount(`
      <ds-shape></ds-shape>
    `)

    const dsShape = new DsShape(page.locator('ds-shape'))

    await dsShape.assertToBeVisible()
  })
})
