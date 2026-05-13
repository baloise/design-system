import { expectScreenshot, screenshot, test } from '@baloise/ds-playwright'

const TAG = 'form'
const VARIANTS = ['select', 'select-states', 'file', 'file-states', 'field-spacing'] as const

const image = screenshot(TAG)

test.beforeEach('Setup', async ({ page }) => {
  await page.setupVisualTest(`/components/${TAG}/test/${TAG}.style.html`)
})

VARIANTS.forEach(variant => {
  test(variant, async ({ page }) => {
    const el = page.getByTestId(variant)
    await expectScreenshot(el, image(variant))
  })
})
