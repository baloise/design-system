import { expect, screenshot, test, waitForChanges } from '@baloise/ds-playwright'

const TAG = 'bal-heading'
const VARIANTS = [
  'basic',
  'no-wrap',
  'levels',
  'subtitle',
  'spaces',
  'colors',
  'inverted',
  'shadow',
  'visual-level',
  'auto-level',
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
