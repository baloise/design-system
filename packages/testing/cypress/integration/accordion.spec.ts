import { app } from '../support/app'

describe('Accordion', () => {
  const page = app.getAccordionPage()

  it('should verify that all accordions are closed', () => {
    page.open()
    cy.get('bal-accordion').each(el => {
      cy.wrap(el).balAccordionIsClosed()
    })
  })

  it('should open open and close an accordions', () => {
    page.open()
    cy.get(page.accordion).balAccordionIsClosed()
    cy.get(page.accordion).click().balAccordionIsOpen()
    cy.get(page.accordion).click().balAccordionIsClosed()
  })

  it('should check if the accordian contains label', () => {
    page.open()
    cy.get(page.accordion).contains('Show more')
    cy.get(page.accordion).click()
    cy.get(page.accordion).contains('Show less')
  })

  it('should check if the accordian is not disabled', () => {
    page.open()
    cy.get(page.accordion).should('not.be.disabled')
  })
})
