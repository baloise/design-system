import { expect, screenshot, test } from '@baloise/ds-playwright'

const VARIANTS = [
  'basic',
  'column-sizes',
  'column-offset',
  'rows',
  'nested',
  'space',
  'breakpoint',
  'vertical-alignment',
  'horizontal-alignment',
  'stratch',
]

const image = screenshot('css-grid')

test.beforeEach('Setup', async ({ page }) => {
  await page.goto(`/test/css-grid.visual.html`)
})

VARIANTS.forEach(variant => {
  test(variant, async ({ page }) => {
    const el = page.getByTestId(variant)
    await expect(el).toHaveScreenshot(image(`${variant}`))
  })
})
