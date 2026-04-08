import { expectScreenshot, screenshot, test, waitForChanges } from '@baloise/ds-playwright'

const TAG = 'ds-card'
const VARIANTS = [
  'basic',
  'tile',
  'square',
  'centered',
  'right',
  'colors',
  'spaces',
  'outlined',
  'combi-header',
  'fullheight',
  'images',
  'image-teaser',
]

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

test.describe('host', () => {
  test.beforeEach('Setup', async ({ page }) => {
    await page.setupVisualTest(`/components/${TAG}/test/${TAG}.visual.html`)
  })

  VARIANTS.filter(variant => variant !== 'html-tags').forEach(variant => {
    test(variant, async ({ page }) => {
      const el = page.getByTestId(variant)
      await expectScreenshot(el, image(variant))
    })
  })
})
