describe('bal-number-input', () => {
  beforeEach(() => {
    cy.visit('/').platform('desktop').waitForDesignSystem()
  })
  it('should change value', () => {
    cy.getByLabelText('Number Input Label')
      .should('have.value', '')
      .click()
      .blur()
      .shouldBeInvalid()
      .getDescribingElement()
      .contains('This field is required')

    cy.getByPlaceholder('Enter a number')
      .type('88')
      .blur()
      .should('have.value', '88')
      .shouldBeValid()
      .getDescribingElement()
      .should('not.contain', 'This field is required')

    cy.getByRole('button', { name: 'Update Number Input' }).click()
    cy.getByPlaceholder('Enter a number')
      .should('have.value', '42')
      .shouldBeValid()
      .getDescribingElement()
      .should('not.contain', 'This field is required')

    cy.getByRole('button', { name: 'Disable Number Input' }).click()
    cy.getByPlaceholder('Enter a number').should('be.disabled')

    cy.getByRole('button', { name: 'Enable Number Input' }).click()
    cy.getByPlaceholder('Enter a number').should('not.be.disabled')

    cy.getByTestId('result').contains('"numberInput": 42')
  })
})
