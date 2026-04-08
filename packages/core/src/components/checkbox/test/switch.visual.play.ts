import { expectScreenshot, screenshot, test, waitForChanges } from '@baloise/ds-playwright'

const TAG = 'ds-check'
const VARIANTS = ['basic', 'disabled', 'invalid', 'inverted']

const image = screenshot(TAG)

test.beforeEach('Setup', async ({ page }) => {
  await page.setupVisualTest(`/components/ds-checkbox/test/${TAG}.visual.html`)
})

VARIANTS.forEach(variant => {
  test(variant, async ({ page }) => {
    const el = page.getByTestId(variant)
    await expectScreenshot(el, image(variant))
  })
})
