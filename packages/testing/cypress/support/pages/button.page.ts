import { dataTestSelector } from '../../../src'

export class ButtonPage {
  primaryButton = dataTestSelector('primary-button')
  primaryButtonDisabled = dataTestSelector('primary-button-disabled')

  open() {
    cy.visit('/components/bal-button')
  }
}
