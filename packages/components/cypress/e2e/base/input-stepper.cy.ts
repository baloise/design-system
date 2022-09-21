describe('bal-input-stepper', () => {
  before(() => {
    cy.platform('desktop').page('/components/form/bal-input-stepper/test/bal-input-stepper.cy.html')
  })

  it('should have value', () => {
    cy.getByTestId('basic').should('have.value', '0')
    cy.getByTestId('basic').balInputStepperIncrease()
    cy.getByTestId('basic').should('have.value', '1')
    cy.getByTestId('basic').balInputStepperDecrease()
    cy.getByTestId('basic').should('have.value', '0')
  })

  it('should be disabled', () => {
    cy.getByTestId('basic').should('not.be.disabled')
    cy.getByTestId('disabled').should('be.disabled')
  })

  it('should be able to reset the form', () => {
    cy.getByTestId('reset').should('have.value', '2')
    cy.getByTestId('reset').balInputStepperDecrease()
    cy.getByTestId('reset').should('have.value', '1')
    cy.getByTestId('button-reset').click()
    cy.getByTestId('reset').should('have.value', '2')
  })
})
