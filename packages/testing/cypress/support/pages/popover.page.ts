import { dataTestSelector } from '../../../src'

export class PopoverPage {
  popover = dataTestSelector('popover')
  open() {
    cy.visit('/components/bal-popover')
  }
}
