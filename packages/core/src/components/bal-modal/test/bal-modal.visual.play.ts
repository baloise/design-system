import { expect, screenshot, test, waitForChanges } from '@baloise/ds-playwright'

const TAG = 'bal-modal'

const image = screenshot(TAG)

test.beforeEach('Setup', async ({ page }) => {
  await page.setupVisualTest(`/components/${TAG}/test/${TAG}.visual.html`)
})

test('basic', async ({ page }) => {
  const buttonEl = page.getByTestId('open-modal-button')

  await expect(page).toHaveScreenshot(image(`basic-before`))
  await buttonEl.click()
  await waitForChanges(page)
  await expect(page).toHaveScreenshot(image(`basic-after`))
})
