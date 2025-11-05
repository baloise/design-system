import { expect, screenshot, test } from '@baloise/ds-playwright'

const TAG = 'bal-dropdown'
const VARIANTS = [
  'basic',
  'long-content',
  'multiple',
  'multiple-chips',
  'clearable',
  'loading',
  'invalid',
  'disabled',
  'form-field',
  'small-purple',
]

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
