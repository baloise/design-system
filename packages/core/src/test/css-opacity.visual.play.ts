import { expect, screenshot, test, useDesktop } from '@baloise/ds-playwright'

const VARIANTS = ['basic']

useDesktop()

const image = screenshot('css-opacity')

test.beforeEach(async ({ page }) => {
  await page.goto(`/test/css-opacity.visual.html`)
})

VARIANTS.forEach(variant => {
  test(variant, async ({ page }) => {
    const el = page.getByTestId(variant)
    await expect(el).toHaveScreenshot(image(`${variant}`))
  })
})
