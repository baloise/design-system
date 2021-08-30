import { SelectAccessor, dataTestSelector } from '../../../src'

export class SelectPage {
  select = SelectAccessor(dataTestSelector('select'))
  typeahead = SelectAccessor(dataTestSelector('typeahead'))
  multiple = SelectAccessor(dataTestSelector('multiple'))

  open() {
    cy.visit('/components/bal-select')
  }
}
