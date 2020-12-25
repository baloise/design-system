import { ButtonAccessor, dataTestSelector } from '../../../src'

export class ButtonPage {
  primaryButton = ButtonAccessor(dataTestSelector("primary-button"))
  open() {
    cy.visit('/components/bal-button')
  }
}
