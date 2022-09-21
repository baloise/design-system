describe('bal-radio', () => {
  before(() => {
    cy.platform('desktop').page('/components/form/bal-radio/test/bal-radio.cy.html')
  })

  it('should select the 1st radio', () => {
    cy.getByTestId('basic').find('bal-radio').first().check().should('be.checked')
    cy.getByTestId('basic').find('bal-radio').eq(1).should('not.be.checked')
    cy.getByTestId('basic').find('bal-radio').eq(2).should('not.be.checked')
    cy.getByTestId('basic').find('bal-radio').eq(3).should('not.be.checked')
  })

  it('should contain label', () => {
    cy.getByTestId('basic').find('bal-radio').first().contains('Label 1')
  })

  it('should be disabled', () => {
    cy.getByTestId('basic').find('bal-radio').first().should('not.be.disabled')
    cy.getByTestId('basic').find('bal-radio').last().should('be.disabled')
  })

  it('should be focusable', () => {
    cy.getByTestId('basic').find('bal-radio').first().should('not.be.focused')
    cy.getByTestId('basic').find('bal-radio').first().focus()
    cy.getByTestId('basic').find('bal-radio').first().should('be.focused')
  })

  it('should be able to reset the form', () => {
    cy.getByTestId('reset').find('bal-radio').first().check().should('be.checked')
    cy.getByTestId('button-reset').click()
    cy.getByTestId('reset').should('have.value', 'female')
  })
})
