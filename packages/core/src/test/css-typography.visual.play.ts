import { expect, screenshot, test } from '@baloise/ds-playwright'

const VARIANTS = ['display', 'title', 'text', 'colors', 'styles', 'alignment']

const image = screenshot('css-typography')

test.beforeEach('Setup', async ({ page }) => {
  await page.setupVisualTest(`/test/css-typography.visual.html`, 'CSS')
})

VARIANTS.forEach(variant => {
  test(variant, async ({ page }) => {
    const el = page.getByTestId(variant)
    await expect(el).toHaveScreenshot(image(`${variant}`))
  })
})
