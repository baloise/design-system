import { Snackbar, expectScreenshot, screenshot, test } from '@baloise/ds-playwright'

const TAG = 'bal-snackbar'
const VARIANTS = ['basic', 'variants', 'variants-with-brand-icon', 'colors']

const image = screenshot(TAG)

test.beforeEach('Setup', async ({ page }) => {
  await page.setupVisualTest(`/components/bal-alert/test/${TAG}.visual.html`)
})

VARIANTS.forEach(variant => {
  test(variant, async ({ page }) => {
    const el = page.getByTestId(variant)
    await expectScreenshot(el, image(variant))
  })
})

test('mobile only', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'Runs only on mobile')

  const el = page.getByTestId('basic-1')

  const dsSnackbar = new Snackbar(el)

  await dsSnackbar.assertToBeVisible()

  await expectScreenshot(el, image('mobile-variant-closed'))
  await dsSnackbar.expand()
  await expectScreenshot(el, image('mobile-variant-open'))
})
