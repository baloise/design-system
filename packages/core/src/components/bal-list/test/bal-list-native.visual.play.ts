import { expectScreenshot, screenshot, test } from '@baloise/ds-playwright'

const VARIANTS = ['unordered-list', 'ordered-list', 'inside-list', 'compact-list', 'description-list']

const image = screenshot('bal-list-native')

test.beforeEach('Setup', async ({ page }) => {
  await page.setupVisualTest(`/components/bal-list/test/bal-list-native.visual.html`)
})

VARIANTS.forEach(variant => {
  test(variant, async ({ page }) => {
    const el = page.getByTestId(variant)
    await expectScreenshot(el, image(variant))
  })
})
