import { expectScreenshot, screenshot, test } from '@baloise/ds-playwright'

const TAG = 'input-stepper'
const VARIANTS = [
  'basic',
  'at-min',
  'at-max',
  'disabled',
  'readonly',
  'invalid',
  'valid',
  'warning',
  'min-max',
  'decimal-step',
  'large-range',
  'optional',
  'form-reset',
]

const image = screenshot(TAG)

test.beforeEach('Setup', async ({ page }) => {
  await page.setupVisualTest(`/components/${TAG}/test/${TAG}.visual.html`)
})

VARIANTS.forEach(variant => {
  test(variant, async ({ page }) => {
    const el = page.getByTestId(variant)
    await expectScreenshot(el, image(variant))
  })
})
