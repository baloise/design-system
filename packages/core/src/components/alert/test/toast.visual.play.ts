import { expectScreenshot, screenshot, test, waitForChanges } from '@baloise/ds-playwright'

const TAG = 'ds-toast'
const VARIANTS = ['basic', 'variants', 'colors']

const image = screenshot(TAG)

test.beforeEach('Setup', async ({ page }) => {
  await page.setupVisualTest(`/components/ds-alert/test/${TAG}.visual.html`)
})

VARIANTS.forEach(variant => {
  test(variant, async ({ page }) => {
    const el = page.getByTestId(variant)
    await expectScreenshot(el, image(variant))
  })
})
