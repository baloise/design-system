import { expectScreenshot, screenshot, test } from '@baloise/ds-playwright'

const TAG = 'spacing'
const VARIANTS = ['padding', 'margin-auto']

const image = screenshot(TAG)

test.beforeEach('Setup', async ({ page }) => {
  await page.setupVisualTest(`/foundation/${TAG}.visual.html`)
})

VARIANTS.forEach(variant => {
  test(variant, async ({ page, isMobile }) => {
    // eslint-disable-next-line playwright/no-skipped-test
    test.skip(isMobile, 'Runs only on desktop')
    const el = page.getByTestId(variant)
    await expectScreenshot(el, image(variant))
  })
})
