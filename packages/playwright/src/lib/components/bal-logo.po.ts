import { Locator } from '@playwright/test'
import { PageObject } from './page-object'
import { E2ELocator } from '../page/utils'

export class BalLogo extends PageObject {
  public readonly animated: Locator

  constructor(el: E2ELocator) {
    super(el)
    this.animated = el.locator('[part="animated"]')
  }
}
