import { SelectAccessor, byTestId } from '../../../../src'

export class SelectPage {
  select = SelectAccessor(byTestId('select'))
  open() {
    cy.visit('/components/form/bal-select')
  }
}
