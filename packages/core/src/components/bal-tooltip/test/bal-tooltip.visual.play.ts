import { expect, screenshot, test, waitForChanges } from '@baloise/ds-playwright'

const TAG = 'bal-tooltip'
const VARIANTS = ['basic', 'placement-right']

const image = screenshot(TAG)

test.beforeEach('Setup', async ({ page }) => {
  await page.setupVisualTest(`/components/${TAG}/test/${TAG}.visual.html`)
})

VARIANTS.forEach(variant => {
  test(variant, async ({ page }) => {
    const triggerEl = page.getByTestId(`${variant}-trigger`).locator('button')

    await triggerEl.hover()
    await waitForChanges(page)

    await expect(page).toHaveScreenshot(image(`${variant}`))
  })
})
