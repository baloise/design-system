import { Page, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

export const a11y = async (page: Page, selector: string) => {
  const accessibilityScanResults = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .include(selector)
    .analyze()

  expect(accessibilityScanResults.violations).toEqual([])
}
