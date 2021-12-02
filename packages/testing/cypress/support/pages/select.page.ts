import { dataTestSelector } from '../../../src'

export class SelectPage {
  select = dataTestSelector('select')
  selectDisabled = dataTestSelector('select-disabled')
  typeahead = dataTestSelector('typeahead')
  multiple = dataTestSelector('multiple')

  open() {
    cy.visit('/components/form/bal-select')
  }
}
