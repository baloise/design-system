import { expectScreenshot, screenshot, test } from '@helvetia-design/playwright'

const TAG = 'app-footer'
const VARIANTS = ['basic', 'custom', 'slotted-logo']

const image = screenshot(TAG)

test.beforeEach('Setup', async ({ page }) => {
  await page.setupVisualTest(`/components/structure/${TAG}/test/${TAG}.visual.html`)
})

VARIANTS.forEach(variant => {
  test(variant, async ({ page }) => {
    const el = page.getByTestId(variant)
    await expectScreenshot(el, image(variant))
  })
})
