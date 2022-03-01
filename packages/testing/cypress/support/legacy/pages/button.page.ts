import { ButtonAccessor, byTestId } from '../../../../src'

export class ButtonPage {
  primaryButton = ButtonAccessor(byTestId('primary-button'))
  primaryButtonDisabled = ButtonAccessor(byTestId('primary-button-disabled'))

  open() {
    cy.visit('/components/bal-button')
  }
}
