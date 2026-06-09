import { expectScreenshot, screenshot, test } from '@baloise/ds-playwright'

const TAG = 'select'
const VARIANTS = [
  'basic',
  'slotted-options',
  'disabled',
  'invalid',
  'valid',
  'warning',
  'multiple-options',
  'long-content',
] as const

const image = screenshot(TAG)

test.describe('style', () => {
  test.beforeEach('Setup', async ({ page }) => {
    await page.setupVisualTest(`/components/${TAG}/test/${TAG}.style.html`)
  })

  VARIANTS.filter(v => !['slotted-options'].includes(v)).forEach(variant => {
    test(variant, async ({ page }) => {
      const el = page.getByTestId(variant)
      await expectScreenshot(el, image(`style-${variant}`))
    })
  })
})
