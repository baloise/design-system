import { expect, screenshot, test, useDesktop } from '@baloise/ds-playwright'

const VARIANTS = [
  'basic',
  'grey',
  'blue',
  'light-blue',
  'purple',
  'green',
  'yellow',
  'red',
  'info',
  'success',
  'warning',
  'danger',
  'primary',
]

useDesktop()

const image = screenshot('css-color')

test.beforeEach(async ({ page }) => {
  await page.goto(`/test/css-color.visual.html`)
})

VARIANTS.forEach(variant => {
  test(variant, async ({ page }) => {
    const el = page.getByTestId(variant)
    await expect(el).toHaveScreenshot(image(`${variant}`))
  })
})
