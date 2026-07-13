import { expect, Locator } from '@playwright/test'
import { PageObject } from './page-object'
import { E2ELocator } from '../page/utils'

export class DsHint extends PageObject {
  public readonly trigger: Locator

  constructor(el: E2ELocator) {
    super(el)
    this.trigger = el.locator('[part="trigger"]')
  }

  async clickTrigger() {
    await this.trigger.click()
  }

  async assertToBeOpen() {
    await expect(this.trigger).toHaveAttribute('aria-expanded', 'true')
  }

  async assertToBeClosed() {
    await expect(this.trigger).toHaveAttribute('aria-expanded', 'false')
  }
}
