import { expect, Locator } from '@playwright/test'
import { PageObject } from './page-object'
import { E2ELocator } from '../page/utils'

export class BalToast extends PageObject {
  private readonly closeButton: Locator
  private readonly heading: Locator
  private readonly action: Locator

  constructor(el: E2ELocator) {
    super(el)
    this.heading = el.locator('h2')
    this.closeButton = el.locator('bal-close')
    this.action = el.locator('#action')
  }

  async clickClose() {
    await this.closeButton.click()
  }

  async clickAction() {
    await this.action.click()
  }

  async assertToHaveHeading(text: string) {
    await expect(this.heading).toContainText(text)
  }

  async assertToContainText(text: string) {
    await expect(this.el).toContainText(text)
  }
}
