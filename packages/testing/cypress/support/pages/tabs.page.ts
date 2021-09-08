import { dataTestSelector } from '../../../src'

export class TabsPage {
  tabs = dataTestSelector('tabs')
  steps = dataTestSelector('steps')

  open() {
    cy.visit('/components/bal-tabs')
  }
}
