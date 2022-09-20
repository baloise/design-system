describe('bal-accordion', () => {
  before(() => cy.page('/components/bal-accordion/test/bal-accordion.cy.html'))

  it('should verify that all accordions are closed', () => {
    cy.get('bal-accordion').each(el => {
      cy.wrap(el).balAccordionIsClosed()
    })
  })

  it('should open open and close an accordions', () => {
    cy.getByTestId('accordion').balAccordionIsClosed()
    cy.getByTestId('accordion').click().balAccordionIsOpen()
    cy.getByTestId('accordion').click().balAccordionIsClosed()
  })

  it('should check if the accordion contains label', () => {
    cy.getByTestId('accordion').contains('Show more')
    cy.getByTestId('accordion').click()
    cy.getByTestId('accordion').contains('Show less')
  })

  it('should check if the accordion is not disabled', () => {
    cy.getByTestId('accordion').should('not.be.disabled')
  })
})
