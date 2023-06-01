describe('bal-input-date', () => {
  beforeEach(() => {
    cy.visit('/components/form/bal-input/test/bal-input-date.cy.html')
    cy.waitForDesignSystem()
  })

  it('should have value and typeable', () => {
    cy.getByTestId('basic')
      .should('have.value', '23.08.2001')
      .clear()
      .should('have.value', '__.__.____')
      .type('10')
      .type('2.')
      .type('23')
      .should('have.value', '10.02.23__')
      .blur()
      .should('have.value', '10.02.2023')
  })

  it('should have placeholder', () => {
    cy.getByTestId('basic').should('have.attr', 'placeholder', 'dd.mm.yyyy')
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
    cy.getByTestId('reset').clear().type('20').type('02').type('1988')
    cy.getByTestId('reset').should('have.value', '20.02.1988')
    cy.getByTestId('button-reset').click()
    cy.getByTestId('reset').should('have.value', '')
  })
})
