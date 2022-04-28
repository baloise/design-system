import { TooltipAccessor, byTestId } from '../../../../../testing/src'

export class TooltipPage {
  tooltip = TooltipAccessor(byTestId('hint'))
  open() {
    cy.page('/components/bal-hint')
  }
}
