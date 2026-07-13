import { PageObject } from './page-object'
import { E2ELocator } from '../page/utils'
import { expect } from '@playwright/test'

export class DsDataItem extends PageObject {
  constructor(el: E2ELocator) {
    super(el)
  }
  async assertLabelText(text: string) {
    const labelContainer = this.el.locator('label')
    await expect(labelContainer).toContainText(text)
  }

  async assertValueText(text: string) {
    const valueContainer = this.el.locator('[class="value-container"]')
    await expect(valueContainer).toContainText(text)
  }

  async assertIsDisabled() {
    await expect(this.el).toHaveClass(/is-disabled/)
  }

  async assertIsNotDisabled() {
    await expect(this.el).not.toHaveClass(/is-disabled/)
  }

  async assertIsMultiline() {
    await expect(this.el).toHaveClass(/is-multiline/)
  }

  async assertIsNotMultiline() {
    await expect(this.el).not.toHaveClass(/is-multiline/)
  }

  async assertIsEditable() {
    await expect(this.el).toHaveClass(/is-editable/)
  }

  async assertIsNotEditable() {
    await expect(this.el).not.toHaveClass(/is-editable/)
  }

  async assertHasRequiredIndicator() {
    const span = this.el.locator('slot[name="label"]').locator('.. span')
    await expect(span).toBeVisible()
  }

  async assertNoRequiredIndicator() {
    const span = this.el.locator('slot[name="label"]').locator('.. span')
    await expect(span).not.toBeVisible()
  }

  async assertLabelLinksToValue() {
    const labelEl = this.el.locator('label')
    const valueEl = this.el.locator('[class="value-container"]')

    const labelId = await labelEl.evaluate(el => el.id)
    const valueLabelledBy = await valueEl.evaluate(el => el.getAttribute('aria-labelledby'))

    expect(labelId).toBeTruthy()
    expect(valueLabelledBy).toBe(labelId)
  }
}
