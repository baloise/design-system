import { expect, screenshot, test } from '@baloise/ds-playwright'

const TAG = 'bal-tabs'
const VARIANTS = [
  'basic',
  'expanded',
  'meta',
  'navbar',
  'navigation',
  'vertical',
  'overflow-stack',
  'overflow-flex',
  'vertical-list',
  'without-active-tab',
  'brand-icons',
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
