import { expect, screenshot, test } from '@baloise/ds-playwright'

const TAG = 'bal-input-stepper'
const VARIANTS = ['basic', 'disabled', 'invalid', 'field']

test.describe.skip('visual', () => {
  const image = screenshot(TAG)

  test.beforeEach(async ({ page }) => {
    await page.goto(`/components/${TAG}/test/${TAG}.visual.html`)
    await page.waitForSelector(TAG)
  })

  VARIANTS.forEach(variant => {
    test(variant, async ({ page }) => {
      const el = page.getByTestId(variant)
      await expect(el).toHaveScreenshot(image(`${variant}`))
    })
  })
})
