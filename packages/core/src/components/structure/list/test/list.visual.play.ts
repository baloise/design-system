import { expectScreenshot, screenshot, test } from '@baloise/ds-playwright'

const TAG = 'list'
const VARIANTS = ['basic', 'ordered', 'linked', 'download', 'accordion', 'nested-accordion']

const image = screenshot(TAG)

test.describe('style', () => {
  test.beforeEach('Setup', async ({ page }) => {
    await page.setupVisualTest(`/components/${TAG}/test/${TAG}.style.html`)
  })

  VARIANTS.forEach(variant => {
    test(variant, async ({ page }) => {
      const el = page.getByTestId(variant)
      await expectScreenshot(el, image(`style-${variant}`))
    })
  })
})

const VARIANTS_HOST = ['basic', 'ordered', 'linked', 'download', 'accordion', 'nested-accordion']

test.describe('host', () => {
  test.beforeEach('Setup', async ({ page }) => {
    await page.setupVisualTest(`/components/${TAG}/test/${TAG}.visual.html`)
  })

  VARIANTS_HOST.forEach(variant => {
    test(variant, async ({ page }) => {
      const el = page.getByTestId(variant)
      await expectScreenshot(el, image(variant))
    })
  })
})
