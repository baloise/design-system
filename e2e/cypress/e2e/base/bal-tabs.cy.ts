import { testOnPlatforms } from '../../support/utils'

describe('bal-tabs', () => {
  beforeEach(() => {
    cy.visit('/components/bal-tabs/test/bal-tabs.cy.html')
    cy.waitForDesignSystem()
  })

  testOnPlatforms(['mobile', 'desktop'], () => {
    it('should have content', () => {
      cy.getByTestId('tabs').should('have.value', 'Tab C')
      cy.getByTestId('tabs').select('Tab B').should('have.value', 'Tab B')
    })

    it('should disable Tab D', () => {
      cy.getByTestId('tabs').spyEvent('balChange')
      cy.getByTestId('tabs').balTabsFindItems().last().should('have.value', 'Tab D')
      cy.getByTestId('tabs').balTabsFindItems().last().should('be.disabled')
      cy.get('@balChange').should('not.have.been.called')
    })
  })
})
