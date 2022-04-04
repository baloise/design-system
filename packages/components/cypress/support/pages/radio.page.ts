import { byTestId } from '../../../../testing/src'

export class RadioPage {
  radio = byTestId('radio')
  selectButton = byTestId('select-button')

  open() {
    cy.visit('/components/form/bal-radio')
  }
}
