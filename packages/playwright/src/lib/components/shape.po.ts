import { PageObject } from './page-object'
import { E2ELocator } from '../page/utils'

export class Shape extends PageObject {
  constructor(el: E2ELocator) {
    super(el)
  }
}
