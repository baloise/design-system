import { expect, screenshot, test, waitForChanges } from '@baloise/ds-playwright'

const TAG = 'bal-sheet'
const VARIANTS = ['basic']

const image = screenshot(TAG)

test.beforeEach(async ({ page }) => {
  await page.goto(`/components/${TAG}/test/${TAG}.visual.html`)
  await page.waitForSelector(TAG)
  await waitForChanges(page)
})

VARIANTS.forEach(variant => {
  test(variant, async ({ page }) => {
    await expect(page).toHaveScreenshot(image(`${variant}`))
  })
})
