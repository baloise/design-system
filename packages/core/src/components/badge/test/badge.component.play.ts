import { DsBadge, test } from '@baloise/ds-playwright'
import { expect } from '@playwright/test'

test.describe('component', () => {
  test('gugus', async ({ page }) => {
    await page.mount(`
      <ds-badge>42</ds-badge>
    `)

    // Expect a title "to contain" a substring.
    expect(true).toBe(true)
  })

  test('should have a default slot', async ({ page }) => {
    await page.mount(`
      <ds-badge>42</ds-badge>
    `)

    const dsBadge = new DsBadge(page.locator('ds-badge'))

    await dsBadge.assertToBeVisible()
    await dsBadge.assertToContainText('42')
  })
})
