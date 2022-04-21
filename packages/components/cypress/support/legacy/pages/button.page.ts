import { ButtonAccessor, byTestId } from '../../../../../testing/src'

export class ButtonPage {
  primaryButton = ButtonAccessor(byTestId('primary-button'))
  primaryButtonDisabled = ButtonAccessor(byTestId('primary-button-disabled'))

  open() {
    cy.page('/components/bal-button')
  }
}
