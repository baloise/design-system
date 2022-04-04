import { TabsAccessor, byTestId } from '../../../../../testing/src'

export class TabsPage {
  tabs = TabsAccessor(byTestId('tabs'))
  open() {
    cy.visit('/components/bal-tabs')
  }
}
