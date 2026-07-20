import { DsSelect, expectScreenshot, screenshot, test } from '@baloise/ds-playwright'

const TAG = 'select'
const VARIANTS = ['basic', 'disabled', 'invalid', 'valid', 'warning'] as const

const HOST_VARIANTS: { testId: string; selectId: string; options: string[]; multiple?: boolean }[] = [
  { testId: 'basic', selectId: 'basic', options: ['Italy'] },
  { testId: 'searchable', selectId: 'searchable', options: ['Germany'] },
  { testId: 'clearable', selectId: 'clearable', options: ['France'] },
  { testId: 'multiple', selectId: 'multi', options: ['German', 'Italian'], multiple: true },
  { testId: 'grouped', selectId: 'grouped', options: ['Basel'] },
]

const HTML_OPTIONS_VARIANTS: { testId: string; selectId: string; options: string[] }[] = [
  { testId: 'flat', selectId: 'flat', options: ['Italy'] },
  { testId: 'grouped', selectId: 'grouped', options: ['Basel'] },
  { testId: 'disabled-option', selectId: 'disabled-option', options: ['Basic'] },
]

const image = screenshot(TAG)

test.describe('style', () => {
  test.beforeEach('Setup', async ({ page }) => {
    await page.setupVisualTest(`/components/${TAG}/test/${TAG}.style.html`)
  })

  VARIANTS.filter(v => !['slotted-options'].includes(v)).forEach(variant => {
    test(variant, async ({ page }) => {
      const el = page.getByTestId(variant)
      await expectScreenshot(el, image(`style-${variant}`))
    })
  })
})

test.describe('host', () => {
  test.beforeEach('Setup', async ({ page }) => {
    await page.setupVisualTest(`/components/${TAG}/test/${TAG}.visual.html`)
  })

  HOST_VARIANTS.forEach(({ testId, selectId, options }) => {
    test(testId, async ({ page }) => {
      const section = page.getByTestId(testId)
      await expectScreenshot(section, image(testId))

      // The dropdown is absolutely positioned and overflows the section's box,
      // so it must be captured against the full page rather than the section itself.
      const select = new DsSelect(page.locator(`ds-select#${selectId}`))
      await select.open()
      await expectScreenshot(page.locator('body'), image(`${testId}-open`))

      for (const option of options) {
        await select.option(option).click()
      }
      await expectScreenshot(page.locator('body'), image(`${testId}-selected`))
    })
  })
})

test.describe('html options', () => {
  test.beforeEach('Setup', async ({ page }) => {
    await page.setupVisualTest(`/components/${TAG}/test/${TAG}.visual-html-options.html`)
  })

  HTML_OPTIONS_VARIANTS.forEach(({ testId, selectId, options }) => {
    test(testId, async ({ page }) => {
      const section = page.getByTestId(testId)
      await expectScreenshot(section, image(`html-options-${testId}`))

      // The dropdown is absolutely positioned and overflows the section's box,
      // so it must be captured against the full page rather than the section itself.
      const select = new DsSelect(page.locator(`ds-select#${selectId}`))
      await select.open()
      await expectScreenshot(page.locator('body'), image(`html-options-${testId}-open`))

      for (const option of options) {
        await select.option(option).click()
      }
      await expectScreenshot(page.locator('body'), image(`html-options-${testId}-selected`))
    })
  })
})
