import { DropDownAccessor, dataTestSelector } from '../../../src'

export class DropDownPage {
  dropdown = DropDownAccessor(dataTestSelector("dropdown"))
  open() {
    cy.visit('/components/bal-dropdown')
  }
}
