import { Locator } from '@playwright/test'
import { PageObject } from './page-object'
import { E2ELocator } from '../page/utils'

export class DsIcon extends PageObject {
  public readonly inner: Locator

  constructor(el: E2ELocator) {
    super(el)
    this.inner = el.locator('[part="inner"]')
  }
}
