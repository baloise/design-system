import { expect } from '@playwright/test'
import { PageObject } from './page-object'
import { E2ELocator } from '../page/utils'

export class Card extends PageObject {
  constructor(el: E2ELocator) {
    super(el)
  }

  async assertToContainText(text: string) {
    await expect(this.el).toContainText(text)
  }
}

export class CardTitle extends PageObject {
  constructor(el: E2ELocator) {
    super(el)
  }

  async assertToContainText(text: string) {
    await expect(this.el).toContainText(text)
  }
}

export class CardSubtitle extends PageObject {
  constructor(el: E2ELocator) {
    super(el)
  }

  async assertToContainText(text: string) {
    await expect(this.el).toContainText(text)
  }
}

export class CardContent extends PageObject {
  constructor(el: E2ELocator) {
    super(el)
  }

  async assertToContainText(text: string) {
    await expect(this.el).toContainText(text)
  }
}

export class CardActions extends PageObject {
  constructor(el: E2ELocator) {
    super(el)
  }
}

export class CardHeader extends PageObject {
  constructor(el: E2ELocator) {
    super(el)
  }

  async assertToContainText(text: string) {
    await expect(this.el).toContainText(text)
  }
}
