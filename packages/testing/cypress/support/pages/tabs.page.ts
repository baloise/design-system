import { TabsAccessor, dataTestSelector } from '../../../src'

export class TabsPage {
  tabs = TabsAccessor(dataTestSelector("tabs"))
  open() {
    cy.visit('/components/bal-tabs')
  }
}
