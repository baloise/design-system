import { expect, screenshot, test, waitForChanges } from '@baloise/ds-playwright'

const TAG = 'bal-modal'

const image = screenshot(TAG)

test.beforeEach(async ({ page }) => {
  await page.goto(`/components/${TAG}/test/${TAG}.visual.html`)
  await page.waitForSelector('bal-button')
})

test('basic', async ({ page }) => {
  const buttonEl = page.getByTestId('open-modal-button')

  await expect(page).toHaveScreenshot(image(`basic-before`))
  await buttonEl.click()
  await waitForChanges(page)
  await expect(page).toHaveScreenshot(image(`basic-after`))
})
