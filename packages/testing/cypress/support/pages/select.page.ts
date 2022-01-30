import { byTestId } from '../../../src'

export class SelectPage {
  select = byTestId('select')
  selectDisabled = byTestId('select-disabled')
  typeahead = byTestId('typeahead')
  multiple = byTestId('multiple')

  open() {
    cy.visit('/components/form/bal-select')
  }
}
