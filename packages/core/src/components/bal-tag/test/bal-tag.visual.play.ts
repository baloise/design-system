import { expect, screenshot, test } from '@baloise/ds-playwright'

const TAG = 'bal-tag'

const image = screenshot(TAG)

test.beforeEach(async ({ page }) => {
  await page.goto(`/components/${TAG}/test/${TAG}.visual.html`)
  await page.waitForSelector(TAG)
})

test('basic', async ({ page }) => {
  const el = page.getByTestId('basic')
  await expect(el).toHaveScreenshot(image('basic'))
})

test('colors', async ({ page }) => {
  const el = page.getByTestId('colors')
  await expect(el).toHaveScreenshot(image('colors'))
})

test('sizes', async ({ page }) => {
  const el = page.getByTestId('sizes')
  await expect(el).toHaveScreenshot(image('sizes'))
})
