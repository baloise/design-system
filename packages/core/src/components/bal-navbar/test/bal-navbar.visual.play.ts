import { expect, expectScreenshot, screenshot, test } from '@baloise/ds-playwright'

const TAG = 'bal-navbar'
const VARIANTS = ['basic', 'simple-light', 'container']

const image = screenshot(TAG)

test.beforeEach('Setup', async ({ page }) => {
  await page.setupVisualTest(`/components/${TAG}/test/${TAG}.visual.html`)
})

VARIANTS.forEach(variant => {
  test(variant, async ({ page }) => {
    const el = page.getByTestId(variant)
    await expectScreenshot(el, image(`${variant}`))
  })
})

test('toggle', async ({ page }) => {
  const el = page.getByTestId('toggle')
  const buttonEl = page.getByTestId('toggle-button')
  await expectScreenshot(el, image(`toggle-before`))
  await buttonEl.click()
  await expectScreenshot(el, image(`toggle-after`))
})
