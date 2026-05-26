import { expectScreenshot, screenshot, test } from '@baloise/ds-playwright'

const TAG = 'carousel'

const VARIANTS = ['image', 'image-no-controls', 'product', 'product-fixed', 'colors'] as const

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
