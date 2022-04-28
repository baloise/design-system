import { byTestId } from '../../../../testing/src'

export class HintPage {
  hint = byTestId('hint')
  fieldHint = byTestId('field-hint')
  dataHint = byTestId('data-hint')

  open() {
    cy.page('/components/bal-hint')
  }
}
