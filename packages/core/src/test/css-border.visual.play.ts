import { expect, screenshot, test, useDesktop } from '@baloise/ds-playwright'

const VARIANTS = [
  'border-none',
  'border-primary',
  'border-grey',
  'border-grey-dark',
  'border-warning',
  'border-success',
  'border-danger',
  'border-primary-light',
  'border-white',
]

useDesktop()

const image = screenshot('css-border')

test.beforeEach('Setup', async ({ page }) => {
  await page.setupVisualTest(`/test/css-border.visual.html`)
})

VARIANTS.forEach(variant => {
  test(variant, async ({ page }) => {
    const el = page.getByTestId(variant)
    await expect(el).toHaveScreenshot(image(`${variant}`))
  })
})
