import { expect, screenshot, test } from '@baloise/ds-playwright'

const TAG = 'bal-nav'

const image = screenshot(TAG)

test.beforeEach('Setup', async ({ page }) => {
  await page.setupVisualTest(`/components/${TAG}/test/${TAG}.visual.html`)
})

test('basic', async ({ page }) => {
  await expect(page).toHaveScreenshot(image(`basic`))
})
