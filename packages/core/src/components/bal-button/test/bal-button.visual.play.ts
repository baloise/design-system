import { expect, screenshot, test } from '@baloise/ds-playwright'

const TAG = 'bal-button'
const VARIANTS = [
  'primary',
  'colors',
  'colors-alternatives',
  'sizes',
  'inverted',
  'expanded',
  'flat',
  'icon-right',
  'outlined',
  'rounded',
  'shadow',
  'variants',
  'states',
  'alert',
  'square',
  'group',
  'links',
  'inverted-links',
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
