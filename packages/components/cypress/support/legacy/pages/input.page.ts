import { InputAccessor, byTestId } from '../../../../../testing/src'

export class InputPage {
  input = InputAccessor(byTestId('input'))
  open() {
    cy.visit('/components/form/bal-input')
  }
}
