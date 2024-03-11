describe('bal-time-input', () => {
  beforeEach(() => {
    cy.visit('/components/bal-time-input/test/bal-time-input.cy.html')
    cy.waitForDesignSystem()
  })

  it('should have value and typeable', () => {
    cy.getByTestId('basic').find('input').should('have.value', '')
    cy.getByTestId('basic').find('input').type('19:45').should('have.value', '19:45')
    cy.getByTestId('basic').find('input').clear().should('not.have.value', '19:45').should('have.value', '')
  })

  it('should be disabled', () => {
    cy.getByTestId('basic').find('input').should('not.be.disabled')
    cy.getByTestId('disabled').find('input').should('be.disabled')
  })

  it('should be focusable', () => {
    cy.getByTestId('basic').find('input').focus().should('be.focused')
    cy.getByTestId('basic').find('input').blur().should('not.be.focused')
  })

  it('should be able to reset the form', () => {
    cy.getByTestId('reset').find('input').clear().type('23:33')
    cy.getByTestId('reset').find('input').should('have.value', '23:33')
    cy.getByTestId('button-reset').click()
    cy.getByTestId('reset').find('input').should('have.value', '19:45')
  })
})
