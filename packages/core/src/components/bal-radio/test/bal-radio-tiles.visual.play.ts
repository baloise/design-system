import { expect, screenshot, test, waitForChanges } from '@baloise/ds-playwright'

const TAG = 'bal-radio'
const VARIANTS = ['basic', 'grid', 'colors']

const image = screenshot(TAG)

test.beforeEach('Setup', async ({ page }) => {
  await page.goto(`/components/${TAG}/test/${TAG}-tiles.visual.html`)
  await page.waitForSelector(TAG)
  await waitForChanges(page)
})

VARIANTS.forEach(variant => {
  test(variant, async ({ page }) => {
    const el = page.getByTestId(variant)
    await expect(el).toHaveScreenshot(image(`${variant}`))
  })
})
