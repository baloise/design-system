import { expect, screenshot, test } from '@baloise/ds-playwright'

const TAG = 'bal-pagination'
const VARIANTS = ['basic', 'ranges', 'small', 'small-with-dots']

const image = screenshot(TAG)

test.beforeEach('Setup', async ({ page }) => {
  await page.setupVisualTest(`/components/${TAG}/test/${TAG}.visual.html`)
})

VARIANTS.forEach(variant => {
  test(variant, async ({ page }) => {
    const el = page.getByTestId(variant)
    await expect(el).toHaveScreenshot(image(`${variant}`))
  })
})
