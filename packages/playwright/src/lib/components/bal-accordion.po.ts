import { expect, Locator } from '@playwright/test'
import { PageObject } from './page-object'
import { E2ELocator } from '../page/utils'

export class BalAccordion extends PageObject {
  public readonly header: Locator
  public readonly summary: Locator
  public readonly marker: Locator
  public readonly content: Locator

  constructor(el: E2ELocator) {
    super(el)
    this.header = el.locator('[part="header"]')
    this.summary = el.locator('[part="summary"]')
    this.marker = el.locator('[part="marker"]')
    this.content = el.locator('[part="content"]')
  }

  async clickSummary() {
    await this.summary.click()
  }

  async assertToBeOpen() {
    await expect(this.summary).toHaveAttribute('aria-expanded', 'true')
  }

  async assertToBeClosed() {
    await expect(this.summary).toHaveAttribute('aria-expanded', 'false')
  }
}
