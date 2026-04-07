import { expect } from '@playwright/test'
import { PageObject } from './page-object'
import { E2ELocator } from '../page/utils'

export class BalCard extends PageObject {
  constructor(el: E2ELocator) {
    super(el)
  }

  async assertToContainText(text: string) {
    await expect(this.el).toContainText(text)
  }
}

export class BalCardTitle extends PageObject {
  constructor(el: E2ELocator) {
    super(el)
  }

  async assertToContainText(text: string) {
    await expect(this.el).toContainText(text)
  }
}

export class BalCardSubtitle extends PageObject {
  constructor(el: E2ELocator) {
    super(el)
  }

  async assertToContainText(text: string) {
    await expect(this.el).toContainText(text)
  }
}

export class BalCardContent extends PageObject {
  constructor(el: E2ELocator) {
    super(el)
  }

  async assertToContainText(text: string) {
    await expect(this.el).toContainText(text)
  }
}

export class BalCardActions extends PageObject {
  constructor(el: E2ELocator) {
    super(el)
  }
}

export class BalCardHeader extends PageObject {
  constructor(el: E2ELocator) {
    super(el)
  }

  async assertToContainText(text: string) {
    await expect(this.el).toContainText(text)
  }
}
