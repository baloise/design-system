import { expect, screenshot, test } from '@baloise/ds-playwright'

const TAG = 'bal-stage'

const image = screenshot(TAG)

test('basic', async ({ page }) => {
  await page.goto(`/components/${TAG}/test/${TAG}.visual.html`)
  await page.waitForSelector(TAG)

  const el = page.getByTestId('basic')
  await expect(el).toHaveScreenshot(image('basic'))
})

test('large', async ({ page }) => {
  await page.goto(`/components/${TAG}/test/${TAG}-large.visual.html`)
  await page.waitForSelector(TAG)

  const el = page.getByTestId('large')
  await expect(el).toHaveScreenshot(image('large'))
})
