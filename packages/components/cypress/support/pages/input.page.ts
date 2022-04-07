import { byTestId } from '../../../../testing/src'

export class InputPage {
  input = byTestId('input')
  inputDisabled = byTestId('input-disabled')
  inputNumber = byTestId('input-number')
  inputDecimal = byTestId('input-decimal')
  inputSuffix = byTestId('input-suffix')

  open() {
    cy.visit('/components/form/bal-input')
  }
}
