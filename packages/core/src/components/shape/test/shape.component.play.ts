import { DsShape, test } from '@baloise/ds-playwright'

test.describe('component', () => {
  test('should be visible', async ({ page }) => {
    await page.mount(`
      <bal-shape></bal-shape>
    `)

    const dsShape = new DsShape(page.locator('bal-shape'))

    await dsShape.assertToBeVisible()
  })
})
