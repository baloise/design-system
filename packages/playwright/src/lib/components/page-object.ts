import { expect } from '@playwright/test'
import { E2ELocator } from '../page/utils'

export abstract class PageObject {
  readonly el: E2ELocator

  constructor(el: E2ELocator) {
    this.el = el
  }

  async assertToBeVisible() {
    await expect(this.el).toBeVisible()
  }

  async assertToBeHidden() {
    await expect(this.el).toBeHidden()
  }
}
