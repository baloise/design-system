import { expect, screenshot, test } from '@baloise/ds-playwright'

const VARIANTS = [
  'flex-direction',
  'flex-wrap',
  'justify-content',
  'align-content',
  'align-items',
  'align-self',
  'flex-operators',
  'flex-gap',
]

const image = screenshot('css-flex')

test.beforeEach('Setup', async ({ page }) => {
  await page.setupVisualTest(`/test/css-flex.visual.html`)
})

VARIANTS.forEach(variant => {
  test(variant, async ({ page }) => {
    const el = page.getByTestId(variant)
    await expect(el).toHaveScreenshot(image(`${variant}`))
  })
})
