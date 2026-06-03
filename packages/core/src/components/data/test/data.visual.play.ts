import { expectScreenshot, screenshot, test } from '@baloise/ds-playwright'

const TAG = 'data'

const VARIANTS = [
  'basic',
  'horizontal',
  'multiline',
  'required',
  'disabled',
  'custom-form',
  'mixed-content',
  'custom-required',
] as const

const image = screenshot(TAG)

test.describe('host', () => {
  test.beforeEach('Setup', async ({ page }) => {
    await page.setupVisualTest(`/components/${TAG}/test/${TAG}.visual.html`)
  })

  VARIANTS.forEach(variant => {
    test(variant, async ({ page }) => {
      const el = page.getByTestId(variant)
      await expectScreenshot(el, image(variant))
    })
  })
})
