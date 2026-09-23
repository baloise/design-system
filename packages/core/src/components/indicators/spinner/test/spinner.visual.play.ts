import { expectScreenshot, screenshot, test } from '@helvetia-design/playwright'

const TAG = 'spinner'
const VARIANTS = ['basic', 'label', 'sizes', 'inverted', 'circle-variation']

const image = screenshot(TAG)

test.beforeEach('Setup', async ({ page }) => {
  await page.setupVisualTest(`/components/indicators/${TAG}/test/${TAG}.visual.html`)
})

VARIANTS.forEach(variant => {
  test(variant, async ({ page }) => {
    const el = page.getByTestId(variant)
    await expectScreenshot(el, image(variant))
  })
})
