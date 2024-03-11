import { selectors } from '../../support/utils'

describe('bal-accordion', () => {
  beforeEach(() => {
    cy.visit('/components/bal-accordion/test/bal-accordion.cy.html').waitForDesignSystem()
  })

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
