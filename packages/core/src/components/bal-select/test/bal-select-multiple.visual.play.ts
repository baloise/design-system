import { expect, expectScreenshot, screenshot, test, waitForChanges } from '@baloise/ds-playwright'

const TAG = 'bal-select'
const VARIANTS = ['disabled', 'invalid', 'field']

const image = screenshot(TAG)

test.beforeEach('Setup', async ({ page }) => {
  await page.setupVisualTest(`/components/${TAG}/test/${TAG}-multiple.visual.html`)
})

test('basic', async ({ page }) => {
  const el = page.getByTestId('basic')
  const inputEl = page.getByTestId('basic-input')

  await expectScreenshot(el, image('basic-before'))

  await inputEl.click()
  await waitForChanges(page)
  await expectScreenshot(page, image('basic-open'))

  const firstOption = el.getByTestId('bal-select-option').nth(1)
  await firstOption.click()
  await waitForChanges(page)
  await expectScreenshot(el, image('selected'))

  await inputEl.click()
  await waitForChanges(page)
  await expectScreenshot(page, image('selected-open'))
})

VARIANTS.forEach(variant => {
  test(variant, async ({ page }) => {
    const el = page.getByTestId(variant)
    await expectScreenshot(el, image(`${variant}`))
  })
})
