describe('bal-checkbox', () => {
  beforeEach(() => {
    cy.visit('/components/form/bal-checkbox/test/bal-checkbox.cy.html')
    cy.waitForDesignSystem()
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
    // First we change the initial value
    cy.getByTestId('reset-basic').uncheck()
    cy.getByTestId('reset-switch').uncheck()
    cy.getByTestId('reset-select-button').uncheck()

    // Values are changed form the initial one
    cy.getByTestId('reset-basic').should('not.be.checked')
    cy.getByTestId('reset-switch').should('not.be.checked')
    cy.getByTestId('reset-select-button').should('not.be.checked')

    // Reset form and check if initial value is restored
    cy.getByTestId('button-reset').click()
    cy.getByTestId('reset-basic').should('be.checked')
    cy.getByTestId('reset-switch').should('be.checked')
    cy.getByTestId('reset-select-button').should('be.checked')
  })
})
