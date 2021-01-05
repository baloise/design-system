import { InputAccessor, dataTestSelector } from '../../../src'

export class InputPage {
  input = InputAccessor(dataTestSelector("input"))
  open() {
    cy.visit('/components/bal-input')
  }
}
