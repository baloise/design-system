import { expect, screenshot, test } from '@baloise/ds-playwright'

const TAG = 'bal-radio'
const VARIANTS = [
  'radio-basic',
  'radio-invalid',
  'radio-disabled',
  'radio-others',
  'radio-long-label',
  'button-basic',
  'button-invalid',
  'button-disabled',
  'button-long-label',
  'group-vertical',
  'group-vertical-on-mobile',
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
