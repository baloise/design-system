import { TabsAccessor, byTestId } from '../../../../src'

export class TabsPage {
  tabs = TabsAccessor(byTestId('tabs'))
  open() {
    cy.visit('/components/bal-tabs')
  }
}
