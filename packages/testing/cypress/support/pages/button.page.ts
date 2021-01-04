import { ButtonAccessor, dataTestSelector } from '../../../src'

export class ButtonPage {
  primaryButton = ButtonAccessor(dataTestSelector("primary-button"))
  primaryButtonDisabled = ButtonAccessor(dataTestSelector("primary-button-disabled"))

  open() {
    cy.visit('/components/bal-button')
  }
}
