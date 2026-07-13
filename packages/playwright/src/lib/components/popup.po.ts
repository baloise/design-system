import { expect, Locator } from '@playwright/test'
import { PageObject } from './page-object'
import { DsClose } from './close.po'
import { E2ELocator } from '../page/utils'

export class DsPopup extends PageObject {
  public readonly panel: Locator
  public readonly close: DsClose

  constructor(el: E2ELocator) {
    super(el)
    this.panel = el.locator('[part="panel"]')
    this.close = new DsClose(el.locator('[part="close"]') as E2ELocator)
  }

  async assertToBeOpen() {
    await expect(this.el).toHaveClass(/\bis-open\b/)
  }

  async assertToBeClosed() {
    await expect(this.el).not.toHaveClass(/\bis-open\b/)
  }
}
