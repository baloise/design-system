import { PageObject } from './page-object'
import { E2ELocator } from '../page/utils'

export class BalShape extends PageObject {
  constructor(el: E2ELocator) {
    super(el)
  }
}
