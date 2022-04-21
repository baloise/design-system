import { byTestId } from '../../../../testing/src'

export class TabsPage {
  tabs = byTestId('tabs')
  steps = byTestId('steps')

  open() {
    cy.page('/components/bal-tabs')
  }
}
