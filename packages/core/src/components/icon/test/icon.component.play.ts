import { DsIcon, test } from '@baloise/ds-playwright'

test.describe('component', () => {
  test('should be visible', async ({ page }) => {
    await page.mount(`
      <bal-icon name="plus"></bal-icon>
    `)

    const dsIcon = new DsIcon(page.locator('bal-icon'))

    await dsIcon.assertToBeVisible()
  })
})
