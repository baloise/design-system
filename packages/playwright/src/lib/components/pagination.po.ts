import { expect, Locator } from '@playwright/test'
import { E2ELocator } from '../page/utils'
import { PageObject } from './page-object'

export class DsPagination extends PageObject {
  readonly previousButton: Locator
  readonly nextButton: Locator

  constructor(el: E2ELocator) {
    super(el)
    this.previousButton = el.locator('#previous')
    this.nextButton = el.locator('#next')
  }

  async clickNext() {
    await this.nextButton.click()
  }

  async clickPrevious() {
    await this.previousButton.click()
  }

  async clickPage(pageNumber: number) {
    await this.el
      .locator(`button`)
      .filter({ hasText: String(pageNumber) })
      .first()
      .click()
  }

  async assertCurrentPage(pageNumber: number) {
    await expect(this.el.locator('button.is-primary')).toContainText(String(pageNumber))
  }

  async assertToBeDisabled() {
    await expect(this.el).toHaveClass(/is-disabled/)
  }

  async assertPreviousToBeDisabled() {
    await expect(this.previousButton).toBeDisabled()
  }

  async assertNextToBeDisabled() {
    await expect(this.nextButton).toBeDisabled()
  }
}
