import { expect, Locator } from '@playwright/test'
import { PageObject } from './page-object'
import { BalClose } from './bal-close.po'
import { E2ELocator } from '../page/utils'

export class BalToast extends PageObject {
  public readonly heading: Locator
  public readonly close: BalClose
  public readonly action: Locator

  constructor(el: E2ELocator) {
    super(el)
    this.heading = el.locator('h2')
    this.close = new BalClose(el.locator('bal-close') as E2ELocator)
    this.action = el.locator('#action')
  }

  async clickClose() {
    await this.close.click()
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
