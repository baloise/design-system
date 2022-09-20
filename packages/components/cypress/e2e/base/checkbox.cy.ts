describe('bal-checkbox', () => {
  before(() => {
    cy.platform('desktop').page('/components/form/bal-checkbox/test/bal-checkbox.cy.html')
  })

  it('should contain label', () => {
    cy.getByTestId('checkbox-normal').contains('Label')
  })

  it('should be checkable', () => {
    cy.getByTestId('checkbox-normal').should('not.be.checked').and('not.be.disabled')
    cy.getByTestId('checkbox-normal').check()
    cy.getByTestId('checkbox-normal').should('be.checked')
    cy.getByTestId('checkbox-normal').uncheck()
    cy.getByTestId('checkbox-normal').should('not.be.checked')
  })

  it('should be disabled', () => {
    cy.getByTestId('checkbox-normal').should('not.be.disabled')
    cy.getByTestId('checkbox-disabled').should('be.disabled')
  })

  it('should be focusable', () => {
    cy.getByTestId('checkbox-normal').should('not.be.focused')
    cy.getByTestId('checkbox-normal').focus()
    cy.getByTestId('checkbox-normal').should('be.focused')
  })

  it('should be able to reset the form', () => {
    cy.getByTestId('checkbox-reset').uncheck()
    cy.getByTestId('button-reset').click()
    cy.getByTestId('checkbox-reset').should('be.checked')
  })
})
