import { expect, screenshot, test, useDesktop } from '@baloise/ds-playwright'

const VARIANTS = ['basic', 'inheritance']

useDesktop()

const image = screenshot('css-structure')

test.beforeEach('Setup', async ({ page }) => {
  await page.setupVisualTest(`/test/css-structure.visual.html`, 'CSS')
})

VARIANTS.forEach(variant => {
  test(variant, async ({ page }) => {
    const el = page.getByTestId(variant)
    await expect(el).toHaveScreenshot(image(`${variant}`))
  })
})
