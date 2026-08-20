import { expect } from '@playwright/test'
import { PageObject } from './page-object'
import { E2ELocator } from '../page/utils'

export class DsSheet extends PageObject {
  readonly container = this.el.locator('.container')

  constructor(el: E2ELocator) {
    super(el)
  }

  async assertToContainText(text: string) {
    await expect(this.el).toContainText(text)
  }

  async assertToBeDefaultContainer() {
    await expect(this.container).not.toHaveClass(/is-fluid|is-compact/)
  }

  async assertToBeFluidContainer() {
    await expect(this.container).toHaveClass(/is-fluid/)
  }

  async assertToBeCompactContainer() {
    await expect(this.container).toHaveClass(/is-compact/)
  }
}
