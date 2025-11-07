import { expect, screenshot, test, waitForChanges } from '@baloise/ds-playwright'

const TAG = 'bal-input-group'
const VARIANTS = [
  'basic',
  'basic-disabled',
  'basic-invalid',
  'icon',
  'icon-disabled',
  'icon-invalid',
  'phone',
  'phone-disabled',
  'phone-invalid',
  'tags',
  'tags-disabled',
  'tags-invalid',
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
