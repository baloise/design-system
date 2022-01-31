import { byTestId } from '../../../src'

export class HintPage {
  hint = byTestId('hint')

  open() {
    cy.visit('/components/bal-hint')
  }
}
