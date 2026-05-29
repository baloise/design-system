import { expect, Locator } from '@playwright/test'
import { PageObject } from './page-object'
import { DsClose } from './close.po'
import { E2ELocator } from '../page/utils'

export class DsDrawer extends PageObject {
  public readonly dialog: Locator
  public readonly close: DsClose

  constructor(el: E2ELocator) {
    super(el)
    this.dialog = el.locator('[part="dialog"]')
    this.close = new DsClose(el.locator('[part="close"]') as E2ELocator)
  }

  async assertToBeOpen() {
    await expect(this.el).toHaveClass(/is-open/)
  }

  async assertToBeClosed() {
    await expect(this.el).not.toHaveClass(/is-open/)
  }
}
