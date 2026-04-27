import { expectScreenshot, screenshot, test } from '@baloise/ds-playwright'

const TAG = 'ds-radio'

const STYLE_VARIANTS = [
  'basic',
  'no-label',
  'disabled',
  'invalid',
  'invalid-disabled',
  'field',
  'field-vertical',
  'form',
  'field-disabled',
  'field-invalid',
]

const HOST_VARIANTS = [
  'basic',
  'no-label',
  'disabled',
  'invalid',
  'invalid-disabled',
  'field',
  'field-vertical',
  'form',
  'field-disabled',
  'field-invalid',
  'tile-basic',
  'tile-columns',
  'tile-invalid',
  'tile-disabled',
  'tile-stack',
  'tile-stack-centered',
]

const image = screenshot(TAG)

test.describe('style', () => {
  test.beforeEach('Setup', async ({ page }) => {
    await page.setupVisualTest(`/components/${TAG}/test/${TAG}.style.html`)
  })

  STYLE_VARIANTS.forEach(variant => {
    test(variant, async ({ page }) => {
      const el = page.getByTestId(variant)
      await expectScreenshot(el, image(`style-${variant}`))
    })
  })
})

test.describe('host', () => {
  test.beforeEach('Setup', async ({ page }) => {
    await page.setupVisualTest(`/components/${TAG}/test/${TAG}.visual.html`)
  })

  HOST_VARIANTS.forEach(variant => {
    test(variant, async ({ page }) => {
      const el = page.getByTestId(variant)
      await expectScreenshot(el, image(variant))
    })
  })
})
