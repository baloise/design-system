import { expect, screenshot, test } from '@baloise/ds-playwright'

const TAG = 'bal-label'
const VARIANTS = ['basic', 'no-wrap', 'sizes', 'states', 'field']

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
