import { expect, Locator } from '@playwright/test'
import { E2ELocator } from '../page/utils'
import { PageObject } from './page-object'

export class DsInputSlider extends PageObject {
  readonly slider: Locator
  readonly handle: Locator

  constructor(el: E2ELocator) {
    super(el)
    this.slider = el.locator('[part="slider"]')
    this.handle = this.slider.locator('.noUi-handle')
  }

  /**
   * Sets the value the way a "one-shot" user commit would: drives noUiSlider's own .set() API
   * directly, which fires a single update + set (see input-slider.picker.ts). Waits out a
   * macrotask tick in-browser so `dsChange`'s debounced (setTimeout(0)) emit has actually run
   * before this resolves — a raw evaluate() round-trip can otherwise return before it fires.
   */
  async fill(value: string) {
    await this.slider.evaluate(
      (el, v) =>
        new Promise<void>(resolve => {
          ;(el as any).noUiSlider.set(Number(v))
          setTimeout(resolve, 0)
        }),
      value,
    )
  }

  async blur() {
    await this.handle.blur()
  }

  async assertValue(value: string) {
    await expect(this.el).toHaveAttribute('value', value)
  }

  async assertToBeDisabled() {
    await expect(this.slider).toHaveAttribute('disabled', '')
  }
}
