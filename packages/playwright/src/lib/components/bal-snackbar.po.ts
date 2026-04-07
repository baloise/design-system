import { expect, Locator } from '@playwright/test'
import { PageObject } from './page-object'
import { BalClose } from './bal-close.po'
import { E2ELocator } from '../page/utils'

export class BalSnackbar extends PageObject {
  public readonly close: BalClose
  public readonly heading: Locator
  public readonly expandButton: Locator
  public readonly actions: Locator

  constructor(el: E2ELocator) {
    super(el)
    this.close = new BalClose(el.locator('bal-close') as E2ELocator)
    this.heading = el.locator('h2')
    this.expandButton = el.locator('#mobile-button')
    this.actions = el.locator('#action').locator('bal-button')
  }

  async clickClose() {
    await this.close.click()
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
