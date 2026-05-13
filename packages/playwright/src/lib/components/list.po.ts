import { expect, Locator } from '@playwright/test'
import { PageObject } from './page-object'
import { DsAccordion } from './accordion.po'
import { E2ELocator } from '../page/utils'

export class DsList extends PageObject {
  public readonly list: Locator

  constructor(el: E2ELocator) {
    super(el)
    this.list = el.locator('[part="list"]')
  }

  async assertToContainText(text: string) {
    await expect(this.el).toContainText(text)
  }
}

export class DsItem extends PageObject {
  /** Native element: <button>, <a>, or <div> depending on variant */
  public readonly item: Locator
  /** Only present when variant="accordion" */
  public readonly accordion: DsAccordion
  public readonly accordionContent: Locator

  constructor(el: E2ELocator) {
    super(el)
    this.item = el.locator('[part="item"]')
    this.accordion = new DsAccordion(el.locator('[part="accordion"]') as E2ELocator)
    this.accordionContent = el.locator('[part="accordion-content"]')
  }

  async clickItem() {
    await this.item.click()
  }
}
