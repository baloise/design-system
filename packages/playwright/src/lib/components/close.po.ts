import { PageObject } from './page-object'
import { E2ELocator } from '../page/utils'

export class BalClose extends PageObject {
  constructor(el: E2ELocator) {
    super(el)
  }

  async click() {
    await this.el.click()
  }
}
