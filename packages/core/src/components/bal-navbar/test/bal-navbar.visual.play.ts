import { expect, screenshot, test, waitForChanges } from '@baloise/ds-playwright'

const TAG = 'bal-navbar'
const VARIANTS = ['basic', 'simple-light', 'container']

const image = screenshot(TAG)

test.beforeEach('Setup', async ({ page }) => {
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

test('toggle', async ({ page }) => {
  const el = page.getByTestId('toggle')
  const buttonEl = page.getByTestId('toggle-button')
  await expect(el).toHaveScreenshot(image(`toggle-before`))
  await buttonEl.click()
  await expect(el).toHaveScreenshot(image(`toggle-after`))
})
