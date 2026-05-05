import { DsIcon, test } from '@baloise/ds-playwright'

test.describe('component', () => {
  test('should be visible', async ({ page }) => {
    await page.mount(`
      <ds-icon name="plus"></ds-icon>
    `)

    const dsIcon = new DsIcon(page.locator('ds-icon'))

    await dsIcon.assertToBeVisible()
  })
})
