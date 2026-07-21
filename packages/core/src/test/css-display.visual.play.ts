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

test.beforeEach('Setup', async ({ page }) => {
  await page.setupVisualTest(`/test/css-display.visual.html`, 'CSS')
})

VARIANTS.forEach(variant => {
  test(variant, async ({ page }) => {
    const el = page.getByTestId(variant)
    await expect(el).toHaveScreenshot(image(`${variant}`))
  })
})
