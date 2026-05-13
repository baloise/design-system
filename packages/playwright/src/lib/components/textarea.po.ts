import { expect, Locator } from '@playwright/test'
import { E2ELocator } from '../page/utils'
import { PageObject } from './page-object'

export class DsTextarea extends PageObject {
  readonly nativeTextarea: Locator

  constructor(el: E2ELocator) {
    super(el)
    this.nativeTextarea = el.locator('[part="textarea"]')
  }

  async fill(value: string) {
    await this.nativeTextarea.fill(value)
  }

  async blur() {
    await this.nativeTextarea.blur()
  }

  async assertValue(value: string) {
    await expect(this.nativeTextarea).toHaveValue(value)
  }

  async assertToBeDisabled() {
    await expect(this.nativeTextarea).toBeDisabled()
  }
}
