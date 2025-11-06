import { expect, screenshot, test, waitForChanges } from '@baloise/ds-playwright'

const TAG = 'bal-select'
const VARIANTS = ['disabled', 'invalid', 'field', 'free-solo']

const image = screenshot(TAG)

test.beforeEach(async ({ page }) => {
  await page.goto(`/components/${TAG}/test/${TAG}-multiple.visual.html`)
  await page.waitForSelector(TAG)
})

test('basic', async ({ page }) => {
  const el = page.getByTestId('basic')
  const inputEl = page.getByTestId('basic-input')

  await expect(el).toHaveScreenshot(image('basic-before'))

  await inputEl.click()
  await waitForChanges(page)
  await expect(page).toHaveScreenshot(image('basic-open'), { maxDiffPixelRatio: 0.02 })

  const firstOption = el.getByTestId('bal-select-option').nth(1)
  await firstOption.click()
  await waitForChanges(page)
  await expect(el).toHaveScreenshot(image('selected'))

  await inputEl.click()
  await waitForChanges(page)
  await expect(page).toHaveScreenshot(image('selected-open'), { maxDiffPixelRatio: 0.02 })
})

VARIANTS.forEach(variant => {
  test(variant, async ({ page }) => {
    const el = page.getByTestId(variant)
    await expect(el).toHaveScreenshot(image(`${variant}`))
  })
})
