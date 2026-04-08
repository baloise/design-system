import { BalBadge, test } from '@baloise/ds-playwright'

test.describe('component', () => {
  test('should have a default slot', async ({ page }) => {
    await page.mount(`
      <bal-badge>42</bal-badge>
    `)

    const balBadge = new BalBadge(page.locator('bal-badge'))

    await balBadge.assertToBeVisible()
    await balBadge.assertToContainText('42')
  })
})
