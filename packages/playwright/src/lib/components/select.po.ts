import { expect, Locator } from '@playwright/test'
import { E2ELocator } from '../page/utils'
import { PageObject } from './page-object'

export class DsSelect extends PageObject {
  readonly trigger: Locator
  readonly searchInput: Locator
  readonly clearButton: Locator
  readonly chips: Locator

  constructor(el: E2ELocator) {
    super(el)
    this.trigger = el.locator('.ss-main')
    this.searchInput = el.locator('.ss-search input')
    this.clearButton = el.locator('.ss-deselect')
    this.chips = el.locator('.ss-value-text')
  }

  option(label: string): Locator {
    return this.el.locator('.ss-option', { hasText: label })
  }

  async open() {
    await this.trigger.click()
  }

  /** Selects an option the way a user would: opens the dropdown and clicks the option by its visible label (e.g. "Basel", not "ch-bs"). */
  async select(label: string) {
    await this.open()
    await this.option(label).click()
  }

  /** Selects multiple options by their visible labels (multi-select keeps the dropdown open between clicks). */
  async selectMultiple(labels: string[]) {
    await this.open()
    for (const label of labels) {
      await this.option(label).click()
    }
  }

  async search(text: string) {
    await this.open()
    await this.searchInput.fill(text)
  }

  async clear() {
    await this.clearButton.click()
  }

  /** Asserts the selected label(s): a single string checks the trigger text, an array checks the multi-select chips. */
  async assertValue(value: string | string[]) {
    if (Array.isArray(value)) {
      await expect(this.chips).toHaveText(value)
    } else {
      await expect(this.trigger).toContainText(value)
    }
  }

  async assertToBeDisabled() {
    await expect(this.trigger).toHaveClass(/ss-disabled/)
  }

  async assertOpen() {
    await expect(this.trigger).toHaveAttribute('aria-expanded', 'true')
  }

  async assertClosed() {
    await expect(this.trigger).toHaveAttribute('aria-expanded', 'false')
  }

  async assertHighlighted(label: string) {
    await expect(this.option(label)).toHaveClass(/ss-highlighted/)
  }
}
