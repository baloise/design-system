import { expect } from '@playwright/test'
import { PageObject } from './page-object'
import { E2ELocator } from '../page/utils'

export class DsCard extends PageObject {
  constructor(el: E2ELocator) {
    super(el)
  }

  async assertToContainText(text: string) {
    await expect(this.el).toContainText(text)
  }
}

export class DsCardTitle extends PageObject {
  constructor(el: E2ELocator) {
    super(el)
  }

  async assertToContainText(text: string) {
    await expect(this.el).toContainText(text)
  }
}

export class DsCardSubtitle extends PageObject {
  constructor(el: E2ELocator) {
    super(el)
  }

  async assertToContainText(text: string) {
    await expect(this.el).toContainText(text)
  }
}

export class DsCardContent extends PageObject {
  constructor(el: E2ELocator) {
    super(el)
  }

  async assertToContainText(text: string) {
    await expect(this.el).toContainText(text)
  }
}

export class DsCardActions extends PageObject {
  constructor(el: E2ELocator) {
    super(el)
  }
}

export class DsCardHeader extends PageObject {
  constructor(el: E2ELocator) {
    super(el)
  }

  async assertToContainText(text: string) {
    await expect(this.el).toContainText(text)
  }
}
