import { expectScreenshot, screenshot, test } from '@helvetia-design/playwright'

const TAG = 'icon'
const VARIANTS = ['basic', 'override', 'inline', 'svg-content', 'shadow', 'turn', 'colors', 'states', 'sizes']

const image = screenshot(TAG)

test.beforeEach('Setup', async ({ page }) => {
  await page.setupVisualTest(`/components/media/${TAG}/test/${TAG}.visual.html`)
})

VARIANTS.forEach(variant => {
  test(variant, async ({ page }) => {
    const el = page.getByTestId(variant)
    await expectScreenshot(el, image(variant))
  })
})
