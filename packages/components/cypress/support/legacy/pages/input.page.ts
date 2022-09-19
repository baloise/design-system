import { InputAccessor, byTestId } from '../../../../../testing/src'

export class InputPage {
  input = InputAccessor(byTestId('basic'))
  open() {
    cy.page('/components/form/bal-input/test/bal-input.cy.html')
  }
}
