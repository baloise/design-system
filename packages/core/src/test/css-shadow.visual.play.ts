import { expect, screenshot, test, useDesktop } from '@baloise/ds-playwright'

const VARIANTS = ['basic', 'text-shadow']

useDesktop()

const image = screenshot('css-shadow')

test.beforeEach('Setup', async ({ page }) => {
  await page.goto(`/test/css-shadow.visual.html`)
})

VARIANTS.forEach(variant => {
  test(variant, async ({ page }) => {
    const el = page.getByTestId(variant)
    await expect(el).toHaveScreenshot(image(`${variant}`))
  })
})
