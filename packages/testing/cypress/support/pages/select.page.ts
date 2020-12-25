import { SelectAccessor, dataTestSelector } from '../../../src'

export class SelectPage {
  select = SelectAccessor(dataTestSelector("select"))
  open() {
    cy.visit('/components/bal-select')
  }
}
