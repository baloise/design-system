import { DsBadge, test } from '@baloise/ds-playwright'

test.describe('component', () => {
  test('should have a default slot', async ({ page }) => {
    await page.mount(`
      <ds-badge>42</ds-badge>
    `)

    const dsBadge = new DsBadge(page.locator('ds-badge'))

    await dsBadge.assertToBeVisible()
    await dsBadge.assertToContainText('42')
  })
})
