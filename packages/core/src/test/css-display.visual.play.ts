import { expect, screenshot, test } from '@baloise/ds-playwright'

const VARIANTS = [
  'display-block',
  'display-flex',
  'display-inline',
  'display-inline-block',
  'display-inline-flex',
  'hidden',
]

const image = screenshot('css-display')

test.beforeEach(async ({ page }) => {
  await page.goto(`/test/css-display.visual.html`)
})

VARIANTS.forEach(variant => {
  test(variant, async ({ page }) => {
    const el = page.getByTestId(variant)
    await expect(el).toHaveScreenshot(image(`${variant}`))
  })
})
