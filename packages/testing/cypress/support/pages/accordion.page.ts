import { byTestId } from '../../../src'

export class AccordionPage {
  accordion = byTestId('accordion')
  open() {
    cy.visit('/components/bal-accordion')
  }
}
