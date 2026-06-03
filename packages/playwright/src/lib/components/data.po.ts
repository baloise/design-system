import { E2ELocator } from '../page/utils'
import { PageObject } from './page-object'
import { expect } from '@playwright/test'

export class DsData extends PageObject {
  constructor(el: E2ELocator) {
    super(el)
  }

  getItems(): E2ELocator {
    return this.el.locator('ds-data-item') as E2ELocator
  }

  getItem(index: number): E2ELocator {
    return this.getItems().nth(index) as E2ELocator
  }

  async assertItemCount(count: number) {
    await expect(this.getItems()).toHaveCount(count)
  }

  async assertIsHorizontal() {
    await expect(this.el).toHaveClass(/is-horizontal/)
  }

  async assertIsNotHorizontal() {
    await expect(this.el).not.toHaveClass(/is-horizontal/)
  }

  async assertHasBorder() {
    await expect(this.el).toHaveClass(/is-bordered/)
  }

  async assertNoBorder() {
    await expect(this.el).not.toHaveClass(/is-bordered/)
  }
}
