import { expect, expectScreenshot, screenshot, test, waitForChanges } from '@baloise/ds-playwright'

const TAG = 'bal-popover'

const image = screenshot(TAG)

test.beforeEach('Setup', async ({ page }) => {
  await page.setupVisualTest(`/components/${TAG}/test/${TAG}.visual.html`)
})

test('basic', async ({ page }) => {
  const triggerEl = page.getByTestId('basic-trigger').locator('button')

  await expectScreenshot(page, image('basic-before'))

  await triggerEl.click()
  await waitForChanges(page)
  await expectScreenshot(page, image('basic-open'))
})
