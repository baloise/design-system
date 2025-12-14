import { expect, expectScreenshot, screenshot, test, waitForChanges } from '@baloise/ds-playwright'

const TAG = 'bal-accordion'
const VARIANTS = ['basic', 'button', 'text-variant', 'stack']

const image = screenshot(TAG)

test.beforeEach('Setup', async ({ page }) => {
  await page.setupVisualTest(`/components/${TAG}/test/${TAG}.visual.html`)
})

VARIANTS.forEach(variant => {
  test(variant, async ({ page }) => {
    const el = page.getByTestId(variant)
    await expectScreenshot(el, image(`${variant}-closed`))
    const trigger = el.locator('bal-accordion-trigger').locator('button')
    await trigger.click()
    await waitForChanges(page)
    await expectScreenshot(el, image(`${variant}-open`))
  })
})
