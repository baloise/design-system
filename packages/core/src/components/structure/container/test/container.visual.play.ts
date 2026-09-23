import { expectScreenshot, screenshot, test } from '@helvetia-design/playwright'

const TAG = 'container'
const VARIANTS = ['default', 'fluid', 'compact'] as const

const image = screenshot(TAG)

test.beforeEach('Setup', async ({ page }) => {
  await page.setupVisualTest(`/components/structure/${TAG}/test/${TAG}.style.html`)
})

VARIANTS.forEach(variant => {
  test(variant, async ({ page }) => {
    const el = page.getByTestId(variant)
    await expectScreenshot(el, image(variant))
  })
})
