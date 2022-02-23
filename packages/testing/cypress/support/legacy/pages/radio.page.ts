import { RadioAccessor, byTestId } from '../../../../src'

export class RadioPage {
  radio = RadioAccessor(byTestId('radio'))
  open() {
    cy.visit('/components/form/bal-radio')
  }
}
