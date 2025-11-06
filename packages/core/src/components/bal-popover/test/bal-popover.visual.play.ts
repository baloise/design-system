import { expect, screenshot, test, waitForChanges } from '@baloise/ds-playwright'

const TAG = 'bal-popover'

const image = screenshot(TAG)

test.beforeEach(async ({ page }) => {
  await page.goto(`/components/${TAG}/test/${TAG}.visual.html`)
  await page.waitForSelector(TAG)
})

test('basic', async ({ page }) => {
  const triggerEl = page.getByTestId('basic-trigger').locator('button')

  await expect(page).toHaveScreenshot(image('basic-before'), { maxDiffPixelRatio: 0.02 })

  await triggerEl.click()
  await waitForChanges(page)
  await expect(page).toHaveScreenshot(image('basic-open'), { maxDiffPixelRatio: 0.02 })
})
