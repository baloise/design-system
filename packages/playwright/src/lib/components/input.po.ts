import { expect, Locator } from '@playwright/test'
import { E2ELocator } from '../page/utils'
import { PageObject } from './page-object'

export class DsInput extends PageObject {
  readonly nativeInput: Locator

  constructor(el: E2ELocator) {
    super(el)
    this.nativeInput = el.locator('[part="input"]')
  }

  async fill(value: string) {
    await this.nativeInput.fill(value)
  }

  async blur() {
    await this.nativeInput.blur()
  }

  async assertValue(value: string) {
    await expect(this.nativeInput).toHaveValue(value)
  }

  async assertToBeDisabled() {
    await expect(this.nativeInput).toBeDisabled()
  }
}
