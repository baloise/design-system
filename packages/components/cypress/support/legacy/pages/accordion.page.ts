import { byTestId, AccordionAccessor } from '../../../../../testing/src'

export class AccordionPage {
  accordion = AccordionAccessor(byTestId('accordion'))
  open() {
    cy.page('/components/bal-accordion')
  }
}
