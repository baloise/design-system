import { expect, Locator } from '@playwright/test'
import { E2ELocator } from '../page/utils'
import { PageObject } from './page-object'

export class DsInputStepper extends PageObject {
  readonly stepper: Locator
  readonly decreaseButton: Locator
  readonly increaseButton: Locator
  readonly valueDisplay: Locator

  constructor(el: E2ELocator) {
    super(el)
    this.stepper = el.locator('[part="stepper"]')
    this.decreaseButton = el.locator('[part="decrease"]')
    this.increaseButton = el.locator('[part="increase"]')
    this.valueDisplay = el.locator('[part="value"]')
  }

  /**
   * Waits out a macrotask tick so `dsChange`'s debounced (setTimeout(0)) emit has
   * actually run before the returned promise resolves.
   */
  async increase() {
    await this.increaseButton.click()
    await this.el.evaluate(() => new Promise<void>(resolve => setTimeout(resolve, 0)))
  }

  async decrease() {
    await this.decreaseButton.click()
    await this.el.evaluate(() => new Promise<void>(resolve => setTimeout(resolve, 0)))
  }

  async assertValue(value: string) {
    await expect(this.el).toHaveAttribute('value', value)
  }

  async assertToBeDisabled() {
    await expect(this.decreaseButton).toHaveAttribute('disabled', '')
    await expect(this.increaseButton).toHaveAttribute('disabled', '')
  }
}
