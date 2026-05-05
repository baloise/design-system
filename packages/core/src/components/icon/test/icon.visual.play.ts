import { expectScreenshot, screenshot, test, waitForChanges } from '@baloise/ds-playwright'

const TAG = 'ds-icon'
const VARIANTS = [
  'basic',
  'override',
  'shapes',
  'inline',
  'svg-content',
  'shadow',
  'turn',
  'colors',
  'states',
  'sizes',
  'tile',
]

const image = screenshot(TAG)

test.beforeEach('Setup', async ({ page }) => {
  await page.setupVisualTest(`/components/${TAG}/test/${TAG}.visual.html`)
})

VARIANTS.forEach(variant => {
  test(variant, async ({ page }) => {
    const el = page.getByTestId(variant)
    await expectScreenshot(el, image(variant))
  })
})
