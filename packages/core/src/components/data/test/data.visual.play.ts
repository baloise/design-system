import { expectScreenshot, screenshot, test } from '@baloise/ds-playwright'

const TAG = 'data'

test.describe('ds-data visual regression', () => {
  test.describe('Sub-Components Pattern', () => {
    test.beforeEach('Setup', async ({ page }) => {
      await page.setupVisualTest(`/components/${TAG}/test/${TAG}.visual.html`)
    })

    test('basic', async ({ page }) => {
      const el = page.getByTestId('basic')
      await expectScreenshot(el, screenshot(TAG)('basic'))
    })

    test('border', async ({ page }) => {
      const el = page.getByTestId('border')
      await expectScreenshot(el, screenshot(TAG)('border'))
    })

    test('horizontal', async ({ page }) => {
      const el = page.getByTestId('horizontal')
      await expectScreenshot(el, screenshot(TAG)('horizontal'))
    })

    test('multiline', async ({ page }) => {
      const el = page.getByTestId('multiline')
      await expectScreenshot(el, screenshot(TAG)('multiline'))
    })

    test('required', async ({ page }) => {
      const el = page.getByTestId('required')
      await expectScreenshot(el, screenshot(TAG)('required'))
    })

    test('disabled', async ({ page }) => {
      const el = page.getByTestId('disabled')
      await expectScreenshot(el, screenshot(TAG)('disabled'))
    })
  })

  test.describe('Custom Label & Input Pattern', () => {
    test.beforeEach('Setup', async ({ page }) => {
      await page.setupVisualTest(`/components/${TAG}/test/${TAG}.visual.html`)
    })

    test('custom form', async ({ page }) => {
      const el = page.getByTestId('custom-form')
      await expectScreenshot(el, screenshot(TAG)('custom-form'))
    })

    test('mixed content', async ({ page }) => {
      const el = page.getByTestId('mixed-content')
      await expectScreenshot(el, screenshot(TAG)('mixed-content'))
    })

    test('custom required', async ({ page }) => {
      const el = page.getByTestId('custom-required')
      await expectScreenshot(el, screenshot(TAG)('custom-required'))
    })
  })
})
