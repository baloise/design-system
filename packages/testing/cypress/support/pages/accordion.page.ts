import { AccordionAccessor, dataTestSelector } from '../../../src'

export class AccordionPage {
  accordion = AccordionAccessor(dataTestSelector("accordion"))
  open() {
    cy.visit('/components/bal-accordion')
  }
}
