describe('bal-number-input', () => {
  beforeEach(() => {
    cy.visit('/components/form/bal-number-input/test/bal-number-input.cy.html')
    cy.waitForDesignSystem()
  })

  it('should have value and typeable', () => {
    cy.getByTestId('basic').should('have.value', '')
    cy.getByTestId('basic').type('42').should('have.value', '42')
    cy.getByTestId('basic').clear().should('not.have.value', '42').should('have.value', '')
  })

  it('should have placeholder', () => {
    cy.getByTestId('basic').should('have.attr', 'placeholder', 'Enter your number')
    cy.getByTestId('basic').should('not.have.attr', 'placeholder', 'Enter your bubu')
  })

  it('should be disabled', () => {
    cy.getByTestId('basic').should('not.be.disabled')
    cy.getByTestId('disabled').should('be.disabled')
  })

  it('should be focusable', () => {
    cy.getByTestId('basic').focus().should('be.focused')
    cy.getByTestId('basic').blur().should('not.be.focused')
  })

  it('should be able to reset the form', () => {
    cy.getByTestId('reset').clear().type('7')
    cy.getByTestId('reset').should('have.value', '7')
    cy.getByTestId('button-reset').click()
    cy.getByTestId('reset').should('have.value', '42')
  })
})
