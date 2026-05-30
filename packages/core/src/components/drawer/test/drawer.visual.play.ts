import { DsDrawer, expectScreenshot, screenshot, test } from '@baloise/ds-playwright'

const TAG = 'drawer'

const VARIANTS: { testId: string; drawerId: string }[] = [
  { testId: 'basic', drawerId: 'drawer-basic' },
  { testId: 'not-closable', drawerId: 'drawer-not-closable' },
  { testId: 'rich-content', drawerId: 'drawer-rich' },
  { testId: 'scrollable', drawerId: 'drawer-scrollable' },
]

const image = screenshot(TAG)

test.describe('host', () => {
  test.beforeEach('Setup', async ({ page }) => {
    await page.setupVisualTest(`/components/${TAG}/test/${TAG}.visual.html`)
  })

  VARIANTS.forEach(({ testId, drawerId }) => {
    test(testId, async ({ page }) => {
      const section = page.getByTestId(testId)
      await section.getByRole('button').first().click()
      const drawer = new DsDrawer(page.locator(`ds-drawer#${drawerId}`))
      await drawer.assertToBeOpen()
      await expectScreenshot(page.locator('body'), image(testId))
      await page.evaluate((id: string) => {
        const el = document.getElementById(id) as any
        return el?.dismiss()
      }, drawerId)
      await drawer.assertToBeClosed()
    })
  })
})
