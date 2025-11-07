import { expect, screenshot, test } from '@baloise/ds-playwright'

const VARIANTS = [
  'padding',
  'padding-top',
  'padding-bottom',
  'padding-left',
  'padding-right',
  'padding-x',
  'padding-y',
  'margin',
  'margin-top',
  'margin-bottom',
  'margin-left',
  'margin-right',
  'margin-x',
  'margin-y',
]

const image = screenshot('css-spacing')

test.beforeEach('Setup', async ({ page }) => {
  await page.goto(`/test/css-spacing.visual.html`)
})

VARIANTS.forEach(variant => {
  test(variant, async ({ page }) => {
    const el = page.getByTestId(variant)
    await expect(el).toHaveScreenshot(image(`${variant}`))
  })
})
