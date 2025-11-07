import { expect, screenshot, test, waitForChanges } from '@baloise/ds-playwright'

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

const image = screenshot(TAG)

test.beforeAll('Setup', async ({ page }) => {
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
