import { expectScreenshot, screenshot, test } from '@baloise/ds-playwright'

const TAG = 'ds-toggle'

const STYLE_VARIANTS = ['basic', 'no-label', 'disabled', 'invalid', 'invalid-disabled', 'required', 'field', 'form']
const HOST_VARIANTS = ['basic', 'no-label', 'disabled', 'invalid', 'invalid-disabled', 'required', 'form']

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
