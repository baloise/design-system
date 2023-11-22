describe('bal-input', () => {
  beforeEach(() => {
    cy.visit('/').platform('desktop').waitForDesignSystem()
  })
  it('should change value', () => {
    cy.getByLabelText('Input Label')
      .should('have.value', 'Init Value')
      .clear()
      .click()
      .blur()
      .shouldBeInvalid()
      .getDescribingElement()
      .contains('This field is required')

    cy.getByPlaceholder('Enter text')
      .type('Hello World')
      .blur()
      .should('have.value', 'Hello World')
      .shouldBeValid()
      .getDescribingElement()
      .should('not.contain', 'This field is required')

    cy.getByRole('button', { name: 'Update Input' }).click()
    cy.getByPlaceholder('Enter text')
      .should('have.value', 'updated value')
      .shouldBeValid()
      .getDescribingElement()
      .should('not.contain', 'This field is required')

    cy.getByRole('button', { name: 'Disable Input' }).click()
    cy.getByPlaceholder('Enter text').should('be.disabled')

    cy.getByRole('button', { name: 'Enable Input' }).click()
    cy.getByPlaceholder('Enter text').should('not.be.disabled')

    cy.getByTestId('result').contains('"input": "updated value"')
  })
})
