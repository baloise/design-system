import { dataTestSelector } from '../../../src'

export class InputPage {
  input = dataTestSelector('input')
  inputDisabled = dataTestSelector('input-disabled')
  inputNumber = dataTestSelector('input-number')
  inputDecimal = dataTestSelector('input-decimal')
  inputSuffix = dataTestSelector('input-suffix')

  open() {
    cy.visit('/components/bal-input')
  }
}
