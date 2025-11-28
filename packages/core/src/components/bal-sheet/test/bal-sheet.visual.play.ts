import { expect, screenshot, test } from '@baloise/ds-playwright'

const TAG = 'bal-sheet'
const VARIANTS = ['basic']

const image = screenshot(TAG)

test.beforeEach('Setup', async ({ page }) => {
  await page.setupVisualTest(`/components/${TAG}/test/${TAG}.visual.html`)
})

VARIANTS.forEach(variant => {
  test(variant, async ({ page }) => {
    await expect(page).toHaveScreenshot(image(`${variant}`))
  })
})
