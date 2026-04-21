import { expect, Locator } from '@playwright/test'
import { E2ELocator } from '../page/utils'
import { PageObject } from './page-object'

export class DsCheckbox extends PageObject {
  readonly nativeInput: Locator

  constructor(el: E2ELocator) {
    super(el)
    this.nativeInput = el.locator('[part="input"]')
  }

  async check() {
    await this.nativeInput.check()
  }

  async uncheck() {
    await this.nativeInput.uncheck()
  }

  async assertToBeChecked() {
    await expect(this.nativeInput).toBeChecked()
  }

  async assertToBeUnchecked() {
    await expect(this.nativeInput).not.toBeChecked()
  }

  async assertToBeDisabled() {
    await expect(this.nativeInput).toBeDisabled()
  }
}
