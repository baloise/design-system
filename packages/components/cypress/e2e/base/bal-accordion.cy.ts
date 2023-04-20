import { selectors } from '../../../../testing/src'

describe('bal-accordion', () => {
  beforeEach(() => {
    cy.visit('/components/bal-accordion/test/bal-accordion.cy.html')
    cy.waitForDesignSystem()
  })

  context.only('v2', () => {
    it('should open open and close an accordions', () => {
      cy.getByTestId('accordion-v2').balAccordionIsClosed()
      cy.getByTestId('accordion-v2').find(selectors.accordion.trigger).click()
      cy.getByTestId('accordion-v2').balAccordionIsOpen()
      cy.getByTestId('accordion-v2').find(selectors.accordion.trigger).click()
      cy.getByTestId('accordion-v2').balAccordionIsClosed()
    })

    it('should check if the accordion is not disabled', () => {
      cy.getByTestId('accordion-v2').find(selectors.accordion.trigger).should('not.be.disabled')
    })
  })

  context('v1', () => {
    it('should open open and close an accordions', () => {
      cy.getByTestId('accordion').balAccordionIsClosed()
      cy.getByTestId('accordion').click()
      cy.getByTestId('accordion').balAccordionIsOpen()
      cy.getByTestId('accordion').click()
      cy.getByTestId('accordion').balAccordionIsClosed()
    })

    it('should check if the accordion contains label', () => {
      cy.getByTestId('accordion').find(selectors.accordion.trigger).contains('Show more')
      cy.getByTestId('accordion').click()
      cy.getByTestId('accordion').find(selectors.accordion.trigger).contains('Show less')
      cy.getByTestId('accordion').find(selectors.accordion.details).contains('Lorem')
    })

    it('should check if the accordion is not disabled', () => {
      cy.getByTestId('accordion').should('not.be.disabled')
    })
  })
})
