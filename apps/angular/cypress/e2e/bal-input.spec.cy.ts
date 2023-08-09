describe('bal-input', () => {
  beforeEach(() => {
    cy.visit('/').platform('desktop').waitForDesignSystem()
  })
  it('should change value', () => {
    cy.getByLabelText('Text Input')
      .should('have.value', '')
      .click()
      .blur()
      .shouldBeInvalid()
      .getDescribingElement()
      .contains('This field is required')

    cy.getByPlaceholder('Enter text')
      .type('Hello World')
      .blur()
      .should('have.value', 'Hello World')
      .shouldNotBeInvalid()
      .getDescribingElement()
      .should('not.contain', 'This field is required')

    cy.getByRole('button', { name: 'Update Input' }).click()
    cy.getByPlaceholder('Enter text')
      .should('have.value', 'updated value')
      .shouldNotBeInvalid()
      .getDescribingElement()
      .should('not.contain', 'This field is required')

    cy.getByRole('button', { name: 'Disable Input' }).click()
    cy.getByPlaceholder('Enter text').should('be.disabled')
  })
})
