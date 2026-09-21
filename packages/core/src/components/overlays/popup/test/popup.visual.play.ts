import { DsPopup, expectScreenshot, screenshot, test } from '@baloise/ds-playwright'

const TAG = 'popup'

const VARIANTS: { testId: string; popupId: string }[] = [
  { testId: 'basic', popupId: 'popup-basic' },
  { testId: 'placement-top', popupId: 'popup-top' },
  { testId: 'placement-right', popupId: 'popup-right' },
  { testId: 'placement-left', popupId: 'popup-left' },
  { testId: 'backdrop-overlay', popupId: 'popup-overlay' },
  { testId: 'focus-trap', popupId: 'popup-focus' },
]

const image = screenshot(TAG)

test.describe('host', () => {
  test.beforeEach('Setup', async ({ page }) => {
    await page.setupVisualTest(`/components/${TAG}/test/${TAG}.visual.html`)
  })

  VARIANTS.forEach(({ testId, popupId }) => {
    test(testId, async ({ page }) => {
      const section = page.getByTestId(testId)
      await section.getByRole('button').first().click()
      const popup = new DsPopup(page.locator(`ds-popup#${popupId}`))
      await popup.assertToBeOpen()
      await expectScreenshot(page.locator('body'), image(testId))
      await page.evaluate((id: string) => {
        const el = document.getElementById(id) as any
        return el?.dismiss()
      }, popupId)
      await popup.assertToBeClosed()
    })
  })
})
