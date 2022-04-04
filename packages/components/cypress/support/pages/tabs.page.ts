import { byTestId } from '../../../../testing/src'

export class TabsPage {
  tabs = byTestId('tabs')
  steps = byTestId('steps')

  open() {
    cy.visit('/components/bal-tabs')
  }
}
