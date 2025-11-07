import { expect, screenshot, test } from '@baloise/ds-playwright'

const TAG = 'bal-field'
const VARIANTS = [
  'basic',
  'disabled',
  'invalid',
  'readonly',
  'required',
  'valid',
  'label-long',
  'horizontal',
  'horizontal-long-label',
  'horizontal-with-hint-hidden',
  'horizontal-with-hint',
  'label-long-with-hint',
]
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
