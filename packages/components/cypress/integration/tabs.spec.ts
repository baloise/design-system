import { app } from '../support/app'

describe('Tabs', () => {
  const page = app.getTabsPage()

  it('should select Tab B', () => {
    page.open()
    cy.get(page.tabs).select('Tab B').should('have.value', 'Tab B')
    cy.get(page.tabs).select('Tab A').should('not.have.value', 'Tab B')
  })

  it('should disable Tab D', () => {
    page.open()
    cy.get(page.tabs).balTabsFindItems().last().should('have.value', 'Tab D')
    cy.get(page.tabs).balTabsFindItems().last().should('be.disabled')
  })

  it('should have Action as button label', () => {
    page.open()
    cy.get(page.tabs).balTabsFindActionButton().contains('Action')
  })

  it('should check step status', () => {
    page.open()
    cy.get(page.steps).balTabsFindItems().first().balTabItemShouldHaveState('done')
    cy.get(page.steps).balTabsFindItems().eq(1).balTabItemShouldHaveState('active')
    cy.get(page.steps).balTabsFindItems().eq(2).balTabItemShouldHaveState('failed')
    cy.get(page.steps).balTabsFindItems().last().balTabItemShouldHaveState('disabled')
  })
})
