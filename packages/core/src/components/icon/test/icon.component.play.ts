import { Icon, test } from '@baloise/ds-playwright'

test.describe('component', () => {
  test('should be visible', async ({ page }) => {
    await page.mount(`
      <bal-icon name="plus"></bal-icon>
    `)

    const dsIcon = new Icon(page.locator('bal-icon'))

    await dsIcon.assertToBeVisible()
  })
})
