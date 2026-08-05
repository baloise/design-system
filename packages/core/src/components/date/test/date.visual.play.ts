import { DsDate, E2ELocator, expectScreenshot, screenshot, test } from '@baloise/ds-playwright'

const TAG = 'date'
const VARIANTS = [
  'basic',
  'form',
  'min-max',
  'free-solo',
  'default-date',
  'allowed-dates',
  'disabled',
  'invalid',
  'valid',
  'warning',
  'loading',
  'long-content',
  'slots',
  'form-reset',
  'autocomplete',
  'inline',
]

const VARIANTS_WITH_PICKER = ['basic', 'min-max', 'default-date', 'allowed-dates']

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

VARIANTS_WITH_PICKER.forEach(variant => {
  test(`${variant}-picker-open`, async ({ page }) => {
    const section = page.getByTestId(variant)
    const date = new DsDate(section.locator('ds-date').first() as E2ELocator)

    await date.triggerButton.click()
    await section.locator('ds-date').first().locator('.air-datepicker-cell.-day-').first().waitFor({ state: 'visible' })

    await expectScreenshot(page.locator('body'), image(`${variant}-picker-open`))

    await page.keyboard.press('Escape')
  })
})
