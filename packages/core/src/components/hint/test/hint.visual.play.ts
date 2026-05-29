import { DsHint, expectScreenshot, screenshot, test } from '@baloise/ds-playwright'

const TAG = 'hint'

const VARIANTS: { testId: string }[] = [
  { testId: 'basic' },
  { testId: 'slots' },
  { testId: 'placement-top' },
  { testId: 'placement-bottom' },
  { testId: 'placement-left' },
  { testId: 'no-title' },
  { testId: 'inline' },
]

const image = screenshot(TAG)

test.describe('host', () => {
  test.beforeEach('Setup', async ({ page }) => {
    await page.setupVisualTest(`/components/${TAG}/test/${TAG}.visual.html`)
  })

  VARIANTS.forEach(({ testId }) => {
    test(testId, async ({ page }) => {
      const section = page.getByTestId(testId)
      const dsHint = new DsHint(section.locator('ds-hint').first())

      await dsHint.clickTrigger()
      await dsHint.assertToBeOpen()
      await expectScreenshot(page.locator('body'), image(testId))

      await page.evaluate(() => {
        document.querySelectorAll('ds-hint').forEach((el: any) => el.dismiss())
      })
      await dsHint.assertToBeClosed()
    })
  })
})
