import { expect, screenshot, test, waitForChanges } from '@baloise/ds-playwright'

const TAG = 'bal-hint'
const VARIANTS = ['basic', 'close-label', 'small']

const image = screenshot(TAG)

test.beforeEach('Setup', async ({ page }) => {
  await page.goto(`/components/${TAG}/test/${TAG}.visual.html`)
  await page.waitForSelector(TAG)
  await waitForChanges(page)
})

VARIANTS.forEach(variant => {
  test(variant, async ({ page }) => {
    const el = page.getByTestId(variant)
    await expect(el).toHaveScreenshot(image(`${variant}-before`))

    el.click()
    await expect(el).toHaveScreenshot(image(`${variant}-after`))
  })
})
