import { expect, screenshot, test } from '@baloise/ds-playwright'

const TAG = 'bal-nav'

const image = screenshot(TAG)

test.beforeEach(async ({ page }) => {
  await page.goto(`/components/${TAG}/test/${TAG}-colors.visual.html`)
  await page.waitForSelector(TAG)
})

test('basic', async ({ page }) => {
  await expect(page).toHaveScreenshot(image(`basic`))
})
