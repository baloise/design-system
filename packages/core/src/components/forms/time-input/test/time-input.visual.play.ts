import { expectScreenshot, screenshot, test } from '@helvetia-design/playwright'

const TAG = 'time-input'
const VARIANTS = ['basic', 'disabled', 'invalid', 'valid', 'warning'] as const

const image = screenshot(TAG)

test.describe('style', () => {
  test.beforeEach('Setup', async ({ page }) => {
    await page.setupVisualTest(`/components/forms/${TAG}/test/${TAG}.style.html`)
  })

  VARIANTS.forEach(variant => {
    test(variant, async ({ page }) => {
      const el = page.getByTestId(variant)
      await expectScreenshot(el, image(`style-${variant}`))
    })
  })
})
