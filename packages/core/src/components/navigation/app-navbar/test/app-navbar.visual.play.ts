import { test, expectScreenshot, screenshot } from '@helvetia-design/playwright'

const TAG = 'app-navbar'
const image = screenshot(TAG)

test('basic', async ({ page }) => {
  await page.setupVisualTest(`/components/navigation/${TAG}/test/${TAG}.visual.html`)
  await expectScreenshot(page, image('basic'))
})

test('light', async ({ page }) => {
  await page.setupVisualTest(`/components/navigation/${TAG}/test/${TAG}-light.visual.html`)
  await expectScreenshot(page, image('light'))
})
