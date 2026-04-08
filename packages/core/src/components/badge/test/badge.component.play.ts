import { Badge, test } from '@baloise/ds-playwright'

test.describe('component', () => {
  test('should have a default slot', async ({ page }) => {
    await page.mount(`
      <bal-badge>42</bal-badge>
    `)

    const dsBadge = new Badge(page.locator('bal-badge'))

    await dsBadge.assertToBeVisible()
    await dsBadge.assertToContainText('42')
  })
})
