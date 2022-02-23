import { InputAccessor, byTestId } from '../../../../src'

export class InputPage {
  input = InputAccessor(byTestId('input'))
  open() {
    cy.visit('/components/form/bal-input')
  }
}
