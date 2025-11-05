import { expect, screenshot, test } from '@baloise/ds-playwright'

const TAG = 'bal-checkbox'
const VARIANTS = ['basic', 'grid', 'colors']

test.describe.skip('tiles', () => {
  const image = screenshot(TAG)

  test.beforeEach(async ({ page }) => {
    await page.goto(`/components/${TAG}/test/${TAG}-tiles.visual.html`)
    await page.waitForSelector(TAG)
  })

  VARIANTS.forEach(variant => {
    test(variant, async ({ page }) => {
      const el = page.getByTestId(variant)
      await expect(el).toHaveScreenshot(image(`${variant}`))
    })
  })
})
