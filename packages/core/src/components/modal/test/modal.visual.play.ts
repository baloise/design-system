import { DsModal, expectScreenshot, screenshot, test } from '@baloise/ds-playwright'

const TAG = 'modal'

const VARIANTS: { testId: string; modalId: string }[] = [
  { testId: 'basic', modalId: 'modal-basic' },
  { testId: 'not-closable', modalId: 'modal-not-closable' },
  { testId: 'direct-slots', modalId: 'modal-direct' },
  { testId: 'narrow', modalId: 'modal-narrow' },
  { testId: 'wide', modalId: 'modal-wide' },
  { testId: 'rich-content', modalId: 'modal-rich' },
  { testId: 'scrollable', modalId: 'modal-scrollable' },
  { testId: 'fullscreen', modalId: 'modal-fullscreen' },
  { testId: 'fullscreen-not-closable', modalId: 'modal-fullscreen-nc' },
]

const image = screenshot(TAG)

test.describe('host', () => {
  test.beforeEach('Setup', async ({ page }) => {
    await page.setupVisualTest(`/components/${TAG}/test/${TAG}.visual.html`)
  })

  VARIANTS.forEach(({ testId, modalId }) => {
    test(testId, async ({ page }) => {
      const section = page.getByTestId(testId)
      await section.getByRole('button').first().click()
      const modal = new DsModal(page.locator(`ds-modal#${modalId}`))
      await modal.assertToBeOpen()
      await expectScreenshot(page.locator('body'), image(testId))
      await page.evaluate((id: string) => {
        const el = document.getElementById(id) as any
        return el?.dismiss()
      }, modalId)
      await modal.assertToBeClosed()
    })
  })
})
