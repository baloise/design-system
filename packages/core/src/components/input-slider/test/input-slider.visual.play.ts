import { expectScreenshot, screenshot, test } from '@baloise/ds-playwright'

const TAG = 'input-slider'
const VARIANTS = [
  'basic',
  'disabled',
  'readonly',
  'invalid',
  'valid',
  'warning',
  'brand-color',
  'step',
  'min-max',
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
