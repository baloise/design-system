import { expect, screenshot, test } from '@baloise/ds-playwright'

const TAG = 'bal-date'
const VARIANTS = [
  'basic',
  'basic-placeholder',
  'basic-value',
  'invalid',
  'invalid-placeholder',
  'invalid-invalid',
  'disabled',
  'disabled-placeholder',
  'disabled-disabled',
  'free-solo',
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
