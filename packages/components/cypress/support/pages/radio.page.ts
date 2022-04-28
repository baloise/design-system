import { byTestId } from '../../../../testing/src'

export class RadioPage {
  radio = byTestId('radio')
  selectButton = byTestId('select-button')

  open() {
    cy.page('/components/form/bal-radio')
  }
}
