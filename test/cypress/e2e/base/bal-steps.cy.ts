import { testOnPlatforms } from '../../support/utils'

describe('bal-steps', () => {
  testOnPlatforms(['mobile', 'desktop'], platform => {
    beforeEach(() => {
      cy.visit('/components/bal-steps/test/bal-steps.cy.html')
      cy.waitForDesignSystem()
    })

    it('should have content', () => {
      cy.getByTestId('steps').should('have.value', 'Active')
      cy.getByTestId('steps').select('Done').should('have.value', 'Done')
    })

    it('should disable Tab D', () => {
      cy.getByTestId('steps').balStepsFindItems().last().should('have.value', 'Disabled')
      cy.getByTestId('steps').balStepsFindItems().last().should('be.disabled')
    })

    it('should have states', () => {
      cy.getByTestId('steps').balStepsFindItems().first().balStepsItemShouldHaveState('done')
      cy.getByTestId('steps').balStepsFindItems().eq(1).balStepsItemShouldHaveState('failed')
      cy.getByTestId('steps').balStepsFindItems().eq(2).balStepsItemShouldHaveState('active')
      cy.getByTestId('steps').balStepsFindItems().last().balStepsItemShouldHaveState('disabled')
    })

    it('should have labels on desktop and on mobile they should be hidden', () => {
      if (platform === 'mobile') {
        cy.getByTestId('steps')
          .balStepsFindItems()
          .first()
          .balStepsFindLabel()
          .contains('Done')
          .should('not.be.visible')
      } else {
        cy.getByTestId('steps').balStepsFindItems().first().balStepsFindLabel().contains('Done').should('be.visible')
        cy.getByTestId('steps').balStepsFindItems().eq(1).contains('Failed')
        cy.getByTestId('steps').balStepsFindItems().eq(2).contains('Active')
        cy.getByTestId('steps').balStepsFindItems().eq(3).contains('Default')
        cy.getByTestId('steps').balStepsFindItems().last().contains('Disabled')
      }
    })
  })
})
