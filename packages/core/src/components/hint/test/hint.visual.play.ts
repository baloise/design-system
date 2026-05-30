import { DsHint, E2ELocator, expectScreenshot, screenshot, test } from '@baloise/ds-playwright'

const TAG = 'hint'

const VARIANTS: { testId: string; description: string }[] = [
  // New structure with label prop
  { testId: 'basic-label', description: 'Basic with label prop' },
  { testId: 'trigger-label', description: 'Custom trigger label' },
  { testId: 'placement-top', description: 'Placement: top' },
  { testId: 'placement-bottom', description: 'Placement: bottom' },
  { testId: 'placement-left', description: 'Placement: left' },
  { testId: 'close-label', description: 'Custom close label' },
  { testId: 'no-title', description: 'Without title' },
  { testId: 'inline', description: 'Inline' },

  // Raw slots structure for custom styling
  { testId: 'custom-styling', description: 'Custom styling with slots' },

  // Legacy/migration structures
  { testId: 'migration-subcomponents', description: 'Legacy sub-components' },
]

const image = screenshot(TAG)

test.describe('host', () => {
  test.beforeEach('Setup', async ({ page }) => {
    await page.setupVisualTest(`/components/${TAG}/test/${TAG}.visual.html`)
  })

  VARIANTS.forEach(({ testId, description }) => {
    test(description, async ({ page }) => {
      const section = page.getByTestId(testId)
      const dsHint = new DsHint(section.locator('ds-hint').first() as E2ELocator)

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
