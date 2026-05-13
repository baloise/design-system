import { expect, Locator } from '@playwright/test'
import { E2ELocator } from '../page/utils'
import { PageObject } from './page-object'

export class DsSegment extends PageObject {
  constructor(el: E2ELocator) {
    super(el)
  }

  itemInput(value: string): Locator {
    return this.el.locator(`#group input[value="${value}"]`)
  }

  async select(value: string) {
    await this.itemInput(value).click()
  }

  async assertSelectedValue(value: string) {
    await expect(this.itemInput(value)).toBeChecked()
  }

  async assertNoSelection() {
    const inputs = this.el.locator('#group input[type="radio"]')
    const count = await inputs.count()
    for (let i = 0; i < count; i++) {
      await expect(inputs.nth(i)).not.toBeChecked()
    }
  }

  async assertToBeDisabled() {
    const inputs = this.el.locator('#group input[type="radio"]')
    const count = await inputs.count()
    for (let i = 0; i < count; i++) {
      await expect(inputs.nth(i)).toBeDisabled()
    }
  }
}
