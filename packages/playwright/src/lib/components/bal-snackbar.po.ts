import { expect, Locator } from '@playwright/test'
import { PageObject } from './page-object'
import { E2ELocator } from '../page/utils'

export class BalSnackbar extends PageObject {
  private readonly closeButton: Locator
  private readonly heading: Locator
  private readonly expandButton: Locator
  private readonly actions: Locator

  constructor(el: E2ELocator) {
    super(el)
    this.closeButton = el.locator('bal-close')
    this.heading = el.locator('h2')
    this.expandButton = el.locator('#mobile-button')
    this.actions = el.locator('#action').locator('bal-button')
  }

  async clickClose() {
    await this.closeButton.click()
  }

  async clickAction(label: string) {
    const action = this.actions.filter({ hasText: label })
    await action.click()
  }

  async expand() {
    await this.expandButton.click()
  }

  async assertToHaveHeading(text: string) {
    await expect(this.heading).toContainText(text)
  }

  async assertToContainText(text: string) {
    await expect(this.el).toContainText(text)
  }
}
