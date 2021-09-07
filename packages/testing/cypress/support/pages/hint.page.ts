import { dataTestSelector } from '../../../src/selectors'

export class HintPage {
  hint = dataTestSelector('hint')

  open() {
    cy.visit('/components/bal-hint')
  }
}
