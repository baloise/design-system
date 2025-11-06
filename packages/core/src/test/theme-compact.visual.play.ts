import { expect, screenshot, test, useDesktop } from '@baloise/ds-playwright'

const VARIANTS = ['navbar', 'typography', 'buttons', 'tags', 'card', 'table', 'form']

useDesktop()

const image = screenshot('theme-compact')

test.beforeEach(async ({ page }) => {
  await page.goto(`/test/theme-compact.visual.html`)
})

VARIANTS.forEach(variant => {
  test(variant, async ({ page }) => {
    const el = page.getByTestId(variant)
    await expect(el).toHaveScreenshot(image(`${variant}`))
  })
})
