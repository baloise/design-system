import { byTestId } from '../../../../testing/src'

export class PopoverPage {
  popover = byTestId('popover')
  open() {
    cy.page('/components/bal-popover')
  }
}
