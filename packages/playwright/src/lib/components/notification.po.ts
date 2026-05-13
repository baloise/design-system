import { expect, Locator } from '@playwright/test'
import { PageObject } from './page-object'
import { DsClose } from './close.po'
import { E2ELocator } from '../page/utils'

export class DsNotification extends PageObject {
  public readonly section: Locator
  public readonly close: DsClose
  public readonly heading: Locator

  constructor(el: E2ELocator) {
    super(el)
    this.section = el.locator('[part="section"]')
    this.close = new DsClose(el.locator('[part="close"]') as E2ELocator)
    this.heading = el.locator('[part="heading"]')
  }

  async clickClose() {
    await this.close.click()
  }

  async assertToContainText(text: string) {
    await expect(this.el).toContainText(text)
  }
}
