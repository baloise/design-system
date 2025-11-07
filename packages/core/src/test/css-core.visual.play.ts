import { expect, screenshot, test, useDesktop } from '@baloise/ds-playwright'

const VARIANTS = ['basic']

useDesktop()

const image = screenshot('css-core')

test.beforeEach('Setup', async ({ page }) => {
  await page.setupVisualTest(`/test/css-core.visual.html`, 'CSS')
})

VARIANTS.forEach(variant => {
  test(variant, async ({ page }) => {
    const el = page.getByTestId(variant)
    await expect(el).toHaveScreenshot(image(`${variant}`))
  })
})
