import { expect, screenshot, test, waitForChanges } from '@baloise/ds-playwright'

const TAG = 'bal-text'
const VARIANTS = ['basic', 'no-wrap', 'colors', 'sizes', 'bold', 'heading', 'inline', 'inverted', 'shadow', 'space']

const image = screenshot(TAG)

test.beforeEach(async ({ page }) => {
  await page.goto(`/components/${TAG}/test/${TAG}.visual.html`)
  await page.waitForSelector(TAG)
  await waitForChanges(page)
})

VARIANTS.forEach(variant => {
  test(variant, async ({ page }) => {
    const el = page.getByTestId(variant)
    await expect(el).toHaveScreenshot(image(`${variant}`))
  })
})
