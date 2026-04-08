import { expect } from '@playwright/test'
import { PageObject } from './page-object'
import { E2ELocator } from '../page/utils'

export class Button extends PageObject {
  constructor(el: E2ELocator) {
    super(el)
  }

  async click() {
    await this.el.click()
  }

  async assertToContainText(text: string) {
    await expect(this.el).toContainText(text)
  }

  async assertToBeDisabled() {
    await expect(this.el).toHaveAttribute('disabled')
  }

  async assertToBeEnabled() {
    await expect(this.el).not.toHaveAttribute('disabled')
  }
}
