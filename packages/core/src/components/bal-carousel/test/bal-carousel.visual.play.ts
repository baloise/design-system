import { expect, screenshot, test } from '@baloise/ds-playwright'

const TAG = 'bal-carousel'
const VARIANTS = ['basic', 'image', 'product', 'card', 'card-with-value', 'responsive']

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
