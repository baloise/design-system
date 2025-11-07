import { expect, screenshot, test, waitForChanges } from '@baloise/ds-playwright'

const TAG = 'bal-accordion'
const VARIANTS = ['basic', 'button', 'text-variant', 'stack']

const image = screenshot(TAG)

test.beforeAll('Setup', async ({ page }) => {
  await page.goto(`/components/${TAG}/test/${TAG}.visual.html`)
  await page.waitForSelector(TAG)
  await waitForChanges(page)
})

VARIANTS.forEach(variant => {
  test(variant, async ({ page }) => {
    const el = page.getByTestId(variant)
    await expect(el).toHaveScreenshot(image(`${variant}-closed`))
    const trigger = el.locator('bal-accordion-trigger').locator('button')
    await trigger.click()
    await expect(el).toHaveScreenshot(image(`${variant}-open`))
  })
})
