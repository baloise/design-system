import { expect, Locator } from '@playwright/test'
import { E2ELocator } from '../page/utils'
import { PageObject } from './page-object'

export class DsInputPhone extends PageObject {
  readonly inner: Locator
  readonly label: Locator
  readonly control: Locator
  readonly description: Locator
  // National-number field (`part="input"`).
  readonly nativeInput: Locator
  // Country picker trigger (`part="country-trigger"`).
  readonly trigger: Locator
  // Filter field inside the open country picker.
  readonly filter: Locator
  readonly listbox: Locator

  constructor(el: E2ELocator) {
    super(el)
    this.inner = el.locator('[part="inner"]')
    this.label = el.locator('[part="label"]')
    this.control = el.locator('[part="control"]')
    this.description = el.locator('[part="description"]')
    this.nativeInput = el.locator('[part="input"]')
    this.trigger = el.locator('[part="country-trigger"]')
    this.filter = el.locator('#country-filter')
    this.listbox = el.locator('[role="listbox"]')
  }

  option(code: string): Locator {
    return this.el.locator(`#country-option-${code.toUpperCase()}`)
  }

  async fill(value: string) {
    await this.nativeInput.fill(value)
  }

  async type(value: string) {
    await this.nativeInput.pressSequentially(value)
  }

  async paste(value: string) {
    await this.nativeInput.focus()
    await this.nativeInput.evaluate((el, next) => {
      const input = el as HTMLInputElement
      input.value = next
      input.dispatchEvent(
        new InputEvent('input', { bubbles: true, composed: true, inputType: 'insertFromPaste', data: next }),
      )
    }, value)
  }

  async blur() {
    await this.nativeInput.blur()
  }

  async open() {
    await this.trigger.click()
    await this.filter.waitFor({ state: 'visible' })
  }

  async selectCountry(code: string) {
    await this.open()
    await this.filter.fill(code)
    await this.option(code).click()
  }

  async assertValue(value: string) {
    await expect(this.el).toHaveAttribute('value', value)
  }

  async assertNationalNumber(value: string) {
    await expect(this.nativeInput).toHaveValue(value)
  }

  async assertToBeDisabled() {
    await expect(this.nativeInput).toBeDisabled()
    await expect(this.trigger).toBeDisabled()
  }

  async assertPickerDisabled() {
    await expect(this.trigger).toBeDisabled()
  }

  async assertOpen() {
    await expect(this.trigger).toHaveAttribute('aria-expanded', 'true')
  }

  async assertClosed() {
    await expect(this.trigger).toHaveAttribute('aria-expanded', 'false')
  }

  async assertToContainText(text: string) {
    await expect(this.el).toContainText(text)
  }
}
