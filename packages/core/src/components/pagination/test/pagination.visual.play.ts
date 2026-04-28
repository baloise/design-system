import { expectScreenshot, screenshot, test } from '@baloise/ds-playwright'

const TAG = 'ds-pagination'

const HOST_VARIANTS = ['basic', 'alignment', 'ranges', 'disabled', 'sizes', 'dots']

const image = screenshot(TAG)

test.describe('host', () => {
  test.beforeEach('Setup', async ({ page }) => {
    await page.setupVisualTest(`/components/${TAG}/test/${TAG}.visual.html`)
  })

  HOST_VARIANTS.forEach(variant => {
    test(variant, async ({ page }) => {
      const el = page.getByTestId(variant)
      await expectScreenshot(el, image(variant))
    })
  })
})
