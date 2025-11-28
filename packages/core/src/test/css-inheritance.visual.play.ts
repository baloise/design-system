import { expect, screenshot, test, useDesktop } from '@baloise/ds-playwright'

const VARIANTS = ['colors', 'border', 'display', 'opacity', 'shadow']

useDesktop()

const image = screenshot('css-inheritance')

test.beforeEach('Setup', async ({ page }) => {
  await page.setupVisualTest(`/test/css-inheritance.visual.html`, 'CSS')
})

VARIANTS.forEach(variant => {
  test(variant, async ({ page }) => {
    const el = page.getByTestId(variant)
    await expect(el).toHaveScreenshot(image(`${variant}`))
  })
})
