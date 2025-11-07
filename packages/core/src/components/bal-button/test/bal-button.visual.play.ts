import { expect, screenshot, test } from '@baloise/ds-playwright'

const TAG = 'bal-button'
const VARIANTS = [
  'primary',
  'colors',
  'colors-alternatives',
  'sizes',
  'inverted',
  'expanded',
  'flat',
  'icon-right',
  'outlined',
  'rounded',
  'shadow',
  'variants',
  'states',
  'alert',
  'square',
  'group',
  'links',
  'inverted-links',
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
