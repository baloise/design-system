import { expect, Locator } from '@playwright/test'
import { PageObject } from './page-object'
import { E2ELocator } from '../page/utils'

export class BalTag extends PageObject {
  private readonly closeButton: Locator

  constructor(el: E2ELocator) {
    super(el)
    this.closeButton = el.locator('bal-close')
  }

  async clickClose() {
    await this.closeButton.click()
  }

  async assertToHaveText(text: string) {
    await expect(this.el).toContainText(text)
  }
}
