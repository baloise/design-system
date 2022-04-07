import { byTestId } from '../../../../testing/src'

export class PopoverPage {
  popover = byTestId('popover')
  open() {
    cy.visit('/components/bal-popover')
  }
}
