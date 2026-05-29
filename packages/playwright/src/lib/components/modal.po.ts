import { expect, Locator } from '@playwright/test'
import { PageObject } from './page-object'
import { DsClose } from './close.po'
import { E2ELocator } from '../page/utils'

export class DsModal extends PageObject {
  public readonly dialog: Locator
  public readonly title: Locator
  public readonly body: Locator
  public readonly close: DsClose

  constructor(el: E2ELocator) {
    super(el)
    this.dialog = el.locator('[part="dialog"]')
    this.title = el.locator('[part="title"]')
    this.body = el.locator('[part="body"]')
    this.close = new DsClose(el.locator('[part="close"]') as E2ELocator)
  }

  async clickClose() {
    await this.close.click()
  }

  async assertToBeOpen() {
    await expect(this.dialog).toHaveAttribute('open')
  }

  async assertToBeClosed() {
    await expect(this.el).not.toHaveAttribute('open')
  }

  async assertTitleText(text: string) {
    await expect(this.title).toContainText(text)
  }
}
