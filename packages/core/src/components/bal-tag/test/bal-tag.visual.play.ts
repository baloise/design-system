import { expect, expectScreenshot, screenshot, test } from '@baloise/ds-playwright'

const TAG = 'bal-tag'

const image = screenshot(TAG)

test.beforeEach('Setup', async ({ page }) => {
  await page.setupVisualTest(`/components/${TAG}/test/${TAG}.visual.html`)
})

test('basic', async ({ page }) => {
  const el = page.getByTestId('basic')
  await expectScreenshot(el, image('basic'))
})

test('colors', async ({ page }) => {
  const el = page.getByTestId('colors')
  await expectScreenshot(el, image('colors'))
})

test('sizes', async ({ page }) => {
  const el = page.getByTestId('sizes')
  await expectScreenshot(el, image('sizes'))
})
