import { dataTestSelector } from '../../../src'

export class HintPage {
  hint = dataTestSelector('hint')

  open() {
    cy.visit('/components/bal-hint')
  }
}
