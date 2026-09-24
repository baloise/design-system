import { expectScreenshot, screenshot, test } from '@helvetia-design/playwright'

const TAG = 'toast'
const VARIANTS = ['basic', 'variants', 'colors']

const image = screenshot(TAG)

test.beforeEach('Setup', async ({ page }) => {
  await page.setupVisualTest(`/components/overlays/alert/test/${TAG}.visual.html`)
})

VARIANTS.forEach(variant => {
  test(variant, async ({ page }) => {
    const el = page.getByTestId(variant)
    await expectScreenshot(el, image(variant))
  })
})
