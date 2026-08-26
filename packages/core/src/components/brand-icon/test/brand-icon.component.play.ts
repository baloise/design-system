import { DsBrandIcon, expect, test } from '@baloise/ds-playwright'

test.describe('component', () => {
  test('renders SVG fetched from src URL', async ({ page }) => {
    const svgBody = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>'

    await page.route('**/test-brand-icon.svg', async route => {
      await route.fulfill({ contentType: 'image/svg+xml', body: svgBody })
    })

    await page.mount(`<ds-brand-icon src="/test-brand-icon.svg"></ds-brand-icon>`)
    const dsBrandIcon = new DsBrandIcon(page.locator('ds-brand-icon'))
    await dsBrandIcon.assertToBeVisible()

    await expect(dsBrandIcon.inner.locator('circle')).toBeVisible()
  })

  test('renders nothing when src fetch fails', async ({ page }) => {
    await page.route('**/missing-icon.svg', async route => {
      await route.fulfill({ status: 404, body: 'Not Found' })
    })

    await page.mount(`<ds-brand-icon src="/missing-icon.svg"></ds-brand-icon>`)
    // eslint-disable-next-line playwright/no-networkidle
    await page.waitForLoadState('networkidle')
    const dsBrandIcon = new DsBrandIcon(page.locator('ds-brand-icon'))
    await expect(dsBrandIcon.inner).toBeEmpty()
  })
})
