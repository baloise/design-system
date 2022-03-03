import { RadioAccessor, SelectButtonAccessor, byTestId } from '../../../../src'

export class RadioPage {
  radio = RadioAccessor(byTestId('radio'))
  selectButton = SelectButtonAccessor(byTestId('select-button'))
  open() {
    cy.visit('/components/form/bal-radio')
  }
}
