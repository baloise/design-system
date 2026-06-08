import { expect, Locator } from '@playwright/test'
import { E2ELocator } from '../page/utils'
import { PageObject } from './page-object'

export class DsSelect extends PageObject {
  readonly nativeSelect: Locator

  constructor(el: E2ELocator) {
    super(el)
    this.nativeSelect = el.locator('[part="select"]')
  }

  async selectValue(value: string) {
    await this.nativeSelect.selectOption(value)
  }

  async blur() {
    await this.nativeSelect.blur()
  }

  async focus() {
    await this.nativeSelect.focus()
  }

  async click() {
    await this.nativeSelect.click()
  }

  async assertValue(value: string) {
    await expect(this.nativeSelect).toHaveValue(value)
  }

  async assertToBeDisabled() {
    await expect(this.nativeSelect).toBeDisabled()
  }

  async assertToBeReadonly() {
    await expect(this.nativeSelect).toHaveAttribute('readonly')
  }

  async assertToBeRequired() {
    await expect(this.nativeSelect).toHaveAttribute('required')
  }

  async assertToBeInvalid() {
    await expect(this.nativeSelect).toHaveAttribute('aria-invalid', 'true')
  }
}
