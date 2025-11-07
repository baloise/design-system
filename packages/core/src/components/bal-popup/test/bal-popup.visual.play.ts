import { expect, screenshot, test, waitForChanges } from '@baloise/ds-playwright'

const TAG = 'bal-popup'

const image = screenshot(TAG)

test.beforeEach('Setup', async ({ page }) => {
  await page.goto(`/components/${TAG}/test/${TAG}.visual.html`)
  await page.waitForSelector('bal-button')
  await waitForChanges(page)
})

test('basic', async ({ page }) => {
  const triggerEl = page.getByTestId('basic-trigger').locator('button')

  await expect(page).toHaveScreenshot(image('basic-before'))

  await triggerEl.click()
  await waitForChanges(page)
  await expect(page).toHaveScreenshot(image('basic-open'))
})
