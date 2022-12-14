import { selectors } from '../../../../testing/src'

describe('bal-accordion', () => {
  before(() => cy.page('/components/bal-accordion/test/bal-accordion.cy.html'))

  it('should open open and close an accordions', () => {
    cy.getByTestId('accordion').balAccordionIsClosed()
    cy.getByTestId('accordion').click()
    cy.getByTestId('accordion').balAccordionIsOpen()
    cy.getByTestId('accordion').click()
    cy.getByTestId('accordion').balAccordionIsClosed()
  })

  it('should check if the accordion contains label', () => {
    cy.getByTestId('accordion').find(selectors.accordion.button).contains('Show more')
    cy.getByTestId('accordion').click()
    cy.getByTestId('accordion').find(selectors.accordion.button).contains('Show less')
    cy.getByTestId('accordion').find(selectors.accordion.content).contains('Lorem')
  })

  it('should check if the accordion is not disabled', () => {
    cy.getByTestId('accordion').should('not.be.disabled')
  })
})
