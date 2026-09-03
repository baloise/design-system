import { DsInputPhone, expectScreenshot, screenshot, test } from '@baloise/ds-playwright'

const TAG = 'input-phone'
const VARIANTS = [
  'basic',
  'countries',
  'disabled',
  'readonly',
  'required',
  'invalid',
  'invalid-slot',
  'valid',
  'warning',
  'description',
  'empty',
  'formatted-value',
  'formatting',
  'form-reset',
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

test('mid-typing', async ({ page }) => {
  const el = page.getByTestId('mid-typing')
  const phone = new DsInputPhone(page.locator('[data-testid="mid-typing"] ds-input-phone'))
  await phone.fill('7912')
  await expectScreenshot(el, image('mid-typing'))
})

test('country-selection', async ({ page }) => {
  const el = page.getByTestId('country-selection')
  const phone = new DsInputPhone(page.locator('[data-testid="country-selection"] ds-input-phone'))
  await phone.open()
  await expectScreenshot(el, image('country-selection'))
})
