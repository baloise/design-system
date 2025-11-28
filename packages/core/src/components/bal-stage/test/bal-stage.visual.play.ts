import { expect, screenshot, test } from '@baloise/ds-playwright'

const TAG = 'bal-stage'

const image = screenshot(TAG)

test('basic', async ({ page }) => {
  await page.setupVisualTest(`/components/${TAG}/test/${TAG}.visual.html`)

  await expect(page).toHaveScreenshot(image('basic'), { maxDiffPixelRatio: 0.02, fullPage: true })
})

test('large', async ({ page }) => {
  await page.setupVisualTest(`/components/${TAG}/test/${TAG}-large.visual.html`)

  await expect(page).toHaveScreenshot(image('large'), { maxDiffPixelRatio: 0.02, fullPage: true })
})
