import { expect, screenshot, test } from '@baloise/ds-playwright'

const TAG = 'bal-checkbox'
const VARIANTS = [
  'checkbox-basic',
  'checkbox-invalid',
  'checkbox-disabled',
  'checkbox-others',
  'checkbox-long-label',
  'switch-basic',
  'switch-invalid',
  'switch-disabled',
  'switch-others',
  'switch-long-label',
  'button-basic',
  'button-invalid',
  'button-disabled',
  'button-long-label',
  'group-vertical',
  'group-vertical-on-mobile',
]

const image = screenshot(TAG)

test.beforeEach(async ({ page }) => {
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
