import { expect, screenshot, test } from '@baloise/ds-playwright'

const TAG = 'bal-segment'
const VARIANTS = ['basic', 'horizontal', 'vertical', 'accordion']

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
