import { expectScreenshot, screenshot, test } from '@helvetia-design/playwright'

const TAG = 'button'
const VARIANTS = [
  'basic',
  'shadow',
  'badge',
  'link',
  'colors',
  'inverted',
  'sizes',
  'wide',
  'long-content',
  'flat',
  'disabled',
  'html-tags',
  'square',
  'icon',
  'loading',
  'group',
  'two-row-button-group',
  'group-column',
]

const image = screenshot(TAG)

test.describe('style', () => {
  test.beforeEach('Setup', async ({ page }) => {
    await page.setupVisualTest(`/components/actions/${TAG}/test/${TAG}.style.html`)
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
    await page.setupVisualTest(`/components/actions/${TAG}/test/${TAG}.visual.html`)
  })

  VARIANTS.filter(variant => variant !== 'html-tags').forEach(variant => {
    test(variant, async ({ page }) => {
      const el = page.getByTestId(variant)
      await expectScreenshot(el, image(variant))
    })
  })
})
