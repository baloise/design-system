import { testOnPlatforms } from '../../../../testing/src'

describe('bal-tabs', () => {
  testOnPlatforms(['mobile', 'desktop'], platform => {
    beforeEach(() => cy.page('/components/bal-tabs/test/bal-tabs.cy.html'))

    it('should have content', () => {
      cy.getByTestId('tabs').spyEvent('balChange')
      cy.getByTestId('tabs').should('have.value', 'Tab C')
      cy.getByTestId('tabs').select('Tab B').should('have.value', 'Tab B')
      cy.get('@balChange').should('have.been.calledOnce')
    })

    it('should disable Tab D', () => {
      cy.getByTestId('tabs').spyEvent('balChange')
      cy.getByTestId('tabs').balTabsFindItems().last().should('have.value', 'Tab D')
      cy.getByTestId('tabs').balTabsFindItems().last().should('be.disabled')
      cy.get('@balChange').should('not.have.been.called')
    })

    describe('Steps', () => {
      it('should have states', () => {
        cy.getByTestId('steps').balTabsFindItems().first().balTabItemShouldHaveState('done')
        cy.getByTestId('steps').balTabsFindItems().eq(1).balTabItemShouldHaveState('failed')
        cy.getByTestId('steps').balTabsFindItems().eq(2).balTabItemShouldHaveState('active')
        cy.getByTestId('steps').balTabsFindItems().last().balTabItemShouldHaveState('disabled')
      })

      it('should have labels on desktop and on mobile they should be hidden', () => {
        if (platform === 'mobile') {
          cy.getByTestId('steps')
            .balTabsFindItems()
            .first()
            .balTabsFindLabel()
            .contains('Tab A')
            .should('not.be.visible')
        } else {
          cy.getByTestId('steps').balTabsFindItems().first().balTabsFindLabel().contains('Tab A').should('be.visible')
          cy.getByTestId('steps').balTabsFindItems().eq(1).contains('Tab B')
          cy.getByTestId('steps').balTabsFindItems().eq(2).contains('Tab C')
          cy.getByTestId('steps').balTabsFindItems().last().contains('Tab D')
        }
      })
    })
  })
})
