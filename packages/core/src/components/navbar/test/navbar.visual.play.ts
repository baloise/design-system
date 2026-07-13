import { test, expectScreenshot, screenshot } from '@baloise/ds-playwright'

const TAG = 'navbar'
const image = screenshot(TAG)

test('basic', async ({ page }) => {
  await page.setupVisualTest(`/components/${TAG}/test/${TAG}.visual.html`)
  await expectScreenshot(page, image('basic'))
})

test('light', async ({ page }) => {
  await page.setupVisualTest(`/components/${TAG}/test/${TAG}-light.visual.html`)
  await expectScreenshot(page, image('light'))
})
