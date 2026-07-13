import { expect, Locator } from '@playwright/test'
import { PageObject } from './page-object'
import { E2ELocator } from '../page/utils'

export class DsCarousel extends PageObject {
  constructor(el: E2ELocator) {
    super(el)
  }

  item(name: string): Locator {
    return this.el.locator(`ds-carousel-item[name="${name}"]`)
  }

  dot(index: number): Locator {
    return this.el.locator('.dot').nth(index)
  }

  async clickDot(index: number) {
    await this.dot(index).click()
  }

  async selectItem(name: string) {
    await this.item(name).click()
  }

  async assertItemSelected(name: string) {
    await expect(this.item(name)).toHaveAttribute('selected', '')
  }

  async assertItemNotSelected(name: string) {
    await expect(this.item(name)).not.toHaveAttribute('selected', '')
  }
}
