import { dataTestSelector } from '../../../src'

export class AccordionPage {
  accordion = dataTestSelector('accordion')
  open() {
    cy.visit('/components/bal-accordion')
  }
}
