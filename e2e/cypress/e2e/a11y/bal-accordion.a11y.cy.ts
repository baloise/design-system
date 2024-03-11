import { selectors } from 'support/utils'

describe('bal-accordion', () => {
  beforeEach(() => {
    cy.pageA11y('/components/bal-accordion/test/bal-accordion.a11y.html')
    cy.platform('desktop')
    cy.waitForDesignSystem()
  })

  context('v1', () => {
    it('collapsed', () => {
      cy.getByTestId('accordion').testA11y()
    })

    it('expanded', () => {
      cy.getByTestId('accordion').click().testA11y()
    })
  })

  context('v2', () => {
    it('collapsed', () => {
      cy.getByTestId('accordion-v2').testA11y()
    })

    it('expanded', () => {
      cy.getByTestId('accordion-v2').find(selectors.accordion.trigger).click()
      cy.getByTestId('accordion-v2').testA11y()
    })
  })
})
