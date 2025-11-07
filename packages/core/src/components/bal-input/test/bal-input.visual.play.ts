import { expect, screenshot, test } from '@baloise/ds-playwright'

const TAG = 'bal-input'
const VARIANTS = ['basic', 'disabled', 'invalid', 'field', 'input-date']

const image = screenshot(TAG)

test.beforeEach(async ({ page }) => {
  await page.goto(`/components/${TAG}/test/${TAG}.visual.html`)
  await page.waitForSelector(TAG)
})

VARIANTS.forEach(variant => {
  test(variant, async ({ page }) => {
    const el = page.getByTestId(variant)
    await expect(el).toHaveScreenshot(image(`${variant}`))
  })
})
