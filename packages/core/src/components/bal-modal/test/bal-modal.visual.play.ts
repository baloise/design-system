import { expect, screenshot, test } from '@baloise/ds-playwright'

const TAG = 'bal-modal'

const image = screenshot(TAG)

test.beforeEach(async ({ page }) => {
  await page.goto(`/components/${TAG}/test/${TAG}.visual.html`)
  await page.waitForSelector(TAG)
})

test.skip('basic', async ({ page }) => {
  const buttonEl = page.getByTestId('open-modal-button')

  await expect(page).toHaveScreenshot(image(`basic-before`))
  await buttonEl.click()
  await expect(page).toHaveScreenshot(image(`basic-after`))
})
