import { expect, screenshot, test } from '@baloise/ds-playwright'

const TAG = 'bal-radio-icon'
const VARIANTS = ['basic']

const image = screenshot(TAG)

test.beforeEach(async ({ page }) => {
  await page.goto(`/components/${TAG}/test/${TAG}-icons.visual.html`)
  await page.waitForSelector(TAG)
})

VARIANTS.forEach(variant => {
  test(variant, async ({ page }) => {
    const el = page.getByTestId(variant)
    await expect(el).toHaveScreenshot(image(`${variant}`))
  })
})
