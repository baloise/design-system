import { byTestId } from '../../../../testing/src'

export class AccordionPage {
  accordion = byTestId('accordion')
  open() {
    cy.page('/components/bal-accordion')
  }
}
