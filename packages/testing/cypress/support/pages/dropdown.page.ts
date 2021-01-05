import { DropdownAccessor, dataTestSelector } from '../../../src'

export class DropdownPage {
  dropdown = DropdownAccessor(dataTestSelector("dropdown"))
  open() {
    cy.visit('/components/bal-dropdown')
  }
}
