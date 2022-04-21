import { RadioAccessor, SelectButtonAccessor, byTestId } from '../../../../../testing/src'

export class RadioPage {
  radio = RadioAccessor(byTestId('radio'))
  selectButton = SelectButtonAccessor(byTestId('select-button'))
  open() {
    cy.page('/components/form/bal-radio')
  }
}
