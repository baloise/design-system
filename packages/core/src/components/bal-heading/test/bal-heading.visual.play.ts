import { expect, screenshot, test } from '@baloise/ds-playwright'

const TAG = 'bal-heading'
const VARIANTS = [
  'basic',
  'no-wrap',
  'levels',
  'subtitle',
  'spaces',
  'colors',
  'inverted',
  'shadow',
  'visual-level',
  'auto-level',
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
