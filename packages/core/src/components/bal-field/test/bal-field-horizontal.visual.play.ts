import { expect, screenshot, test } from '@baloise/ds-playwright'

const TAG = 'bal-field'
const VARIANTS = ['horizontal', 'horizontal-long-label', 'horizontal-with-hint', 'horizontal-with-hint-hidden']

const image = screenshot(TAG)

test.beforeEach(async ({ page }) => {
  await page.goto(`/components/${TAG}/test/${TAG}-horizontal.visual.html`)
  await page.waitForSelector(TAG)
})

VARIANTS.forEach(variant => {
  test(variant, async ({ page }) => {
    const el = page.getByTestId(variant)
    await expect(el).toHaveScreenshot(image(`${variant}`))
  })
})
