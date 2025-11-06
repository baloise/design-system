import { expect, screenshot, test } from '@baloise/ds-playwright'

const TAG = 'bal-sheet'
const VARIANTS = ['basic']

const image = screenshot(TAG)

test.beforeEach(async ({ page }) => {
  await page.goto(`/components/${TAG}/test/${TAG}.visual.html`)
  await page.waitForSelector(TAG)
})

VARIANTS.forEach(variant => {
  test.skip(variant, async ({ page }) => {
    const el = page.getByTestId(variant)
    await expect(el).toHaveScreenshot(image(`${variant}`))
  })
})
