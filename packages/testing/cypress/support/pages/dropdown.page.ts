import { dataTestSelector } from '../../../src'

export class DropdownPage {
  dropdown = dataTestSelector('dropdown')
  open() {
    cy.visit('/components/bal-dropdown')
  }
}
