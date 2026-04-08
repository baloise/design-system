import { BalIcon, test } from '@baloise/ds-playwright'

test.describe('component', () => {
  test('should be visible', async ({ page }) => {
    await page.mount(`
      <bal-icon name="plus"></bal-icon>
    `)

    const balIcon = new BalIcon(page.locator('bal-icon'))

    await balIcon.assertToBeVisible()
  })
})
