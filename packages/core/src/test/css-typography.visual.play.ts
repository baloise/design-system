import { expect, screenshot, test } from '@baloise/ds-playwright'

const VARIANTS = ['display', 'title', 'text', 'colors', 'styles', 'alignment']

const image = screenshot('css-typography')

test.beforeEach(async ({ page }) => {
  await page.goto(`/test/css-typography.visual.html`)
})

VARIANTS.forEach(variant => {
  test(variant, async ({ page }) => {
    const el = page.getByTestId(variant)
    await expect(el).toHaveScreenshot(image(`${variant}`))
  })
})
