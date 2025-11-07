import { expect, screenshot, test, useDesktop } from '@baloise/ds-playwright'

const VARIANTS = ['radius-none', 'radius-normal', 'radius-large', 'radius-rounded']

useDesktop()

const image = screenshot('css-radius')

test.beforeEach('Setup', async ({ page }) => {
  await page.goto(`/test/css-radius.visual.html`)
})

VARIANTS.forEach(variant => {
  test(variant, async ({ page }) => {
    const el = page.getByTestId(variant)
    await expect(el).toHaveScreenshot(image(`${variant}`))
  })
})
