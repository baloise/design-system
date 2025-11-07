import { expect, screenshot, test, waitForChanges } from '@baloise/ds-playwright'

const TAG = 'bal-nav'

const image = screenshot(TAG)

test.beforeAll('Setup', async ({ page }) => {
  await page.goto(`/components/${TAG}/test/${TAG}-colors.visual.html`)
  await waitForChanges(page)
})

test('basic', async ({ page }) => {
  await expect(page).toHaveScreenshot(image(`basic`))
})
