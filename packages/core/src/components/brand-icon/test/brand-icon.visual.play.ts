import { expectScreenshot, screenshot, test } from '@baloise/ds-playwright'

const TAG = 'icon'
const VARIANTS = ['basic', 'svg-content', 'states', 'sizes', 'tile']

const image = screenshot(TAG)

test.beforeEach('Setup', async ({ page }) => {
  await page.setupVisualTest(`/components/${TAG}/test/${TAG}.visual.html`)
})

VARIANTS.forEach(variant => {
  test(variant, async ({ page }) => {
    const el = page.getByTestId(variant)
    await expectScreenshot(el, image(variant))
  })
})
