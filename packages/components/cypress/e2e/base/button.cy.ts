describe('bal-button', () => {
  before(() => cy.page('/components/bal-button/test/bal-button.cy.html'))

  it('should contain label', () => {
    cy.getByTestId('primary-button').contains('Primary')
    cy.getByTestId('primary-button-disabled').contains('Disabled')
  })

  it('should be clickable & focusable', () => {
    cy.getByTestId('primary-button').click().should('be.focused').blur().should('not.be.focused')
  })

  it('should be disabled or not', () => {
    cy.getByTestId('primary-button').should('not.be.disabled')
    cy.getByTestId('primary-button-disabled').should('be.disabled')
  })
})
