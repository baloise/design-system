import { byTestId } from '../../../../testing/src'

export class SelectPage {
  select = byTestId('select')
  selectDisabled = byTestId('select-disabled')
  typeahead = byTestId('typeahead')
  multiple = byTestId('multiple')

  open() {
    cy.page('/components/form/bal-select')
  }
}
