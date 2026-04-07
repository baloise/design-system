import { expect } from '@playwright/test'
import { PageObject } from './page-object'
import { E2ELocator } from '../page/utils'

export class BalBadge extends PageObject {
  constructor(el: E2ELocator) {
    super(el)
  }

  async assertToContainText(text: string) {
    await expect(this.el).toContainText(text)
  }
}
