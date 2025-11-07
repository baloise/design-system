import { expect, screenshot, test } from '@baloise/ds-playwright'

const TAG = 'bal-steps'
const VARIANTS = ['steps', 'steps-links', 'steps-with-four', 'light-blue', 'purple', 'red', 'green', 'yellow']

const image = screenshot(TAG)

test.beforeEach(async ({ page }) => {
  await page.goto(`/components/${TAG}/test/${TAG}.visual.html`)
  await page.waitForSelector(TAG)
  await waitForChanges(page)
})

VARIANTS.forEach(variant => {
  test(variant, async ({ page }) => {
    const el = page.getByTestId(variant)
    await expect(el).toHaveScreenshot(image(`${variant}`))
  })
})
