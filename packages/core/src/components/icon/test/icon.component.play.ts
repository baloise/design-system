import { DsIcon, expect, test } from '@baloise/ds-playwright'

test.describe('component', () => {
  test('should be visible', async ({ page }) => {
    await page.mount(`
      <ds-icon name="plus"></ds-icon>
    `)

    const dsIcon = new DsIcon(page.locator('ds-icon'))

    await dsIcon.assertToBeVisible()
  })

  test('renders SVG fetched from src URL', async ({ page }) => {
    const svgBody = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>'

    await page.route('**/test-brand-icon.svg', async route => {
      await route.fulfill({ contentType: 'image/svg+xml', body: svgBody })
    })

    await page.mount(`<ds-icon src="/test-brand-icon.svg"></ds-icon>`)
    const dsIcon = new DsIcon(page.locator('ds-icon'))
    await dsIcon.assertToBeVisible()
    await expect(page.locator('ds-icon')).not.toHaveClass(/is-filled/)

    const inner = page.locator('ds-icon').locator('[part="inner"]')
    await expect(inner.locator('circle')).toBeVisible()
  })

  test('renders nothing when src fetch fails', async ({ page }) => {
    await page.route('**/missing-icon.svg', async route => {
      await route.fulfill({ status: 404, body: 'Not Found' })
    })

    await page.mount(`<ds-icon src="/missing-icon.svg"></ds-icon>`)
    // eslint-disable-next-line playwright/no-networkidle
    await page.waitForLoadState('networkidle')
    const inner = page.locator('ds-icon').locator('[part="inner"]')
    await expect(inner).toBeEmpty()
  })
})
