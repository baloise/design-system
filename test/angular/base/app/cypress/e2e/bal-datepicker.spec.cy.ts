describe('bal-datepicker', () => {
  beforeEach(() => {
    cy.visit('/').platform('desktop').waitForDesignSystem()
  })
  it('should change value', () => {
    cy.getByLabelText('Datepicker Label')
      .should('have.value', '09.09.2023')
      .clear()
      .click()
      .blur()
      .shouldBeInvalid()
      .getDescribingElement()
      .contains('This field is required')

    cy.getByPlaceholder('Pick a date')
      .type('20.02.2024')
      .blur()
      .should('have.value', '20.02.2024')
      .shouldBeValid()
      .getDescribingElement()
      .should('not.contain', 'This field is required')

    cy.get('body').type('{esc}')

    cy.getByRole('button', { name: 'Update Datepicker' }).click()
    cy.getByPlaceholder('Pick a date')
      .should('have.value', '21.10.2023')
      .shouldBeValid()
      .getDescribingElement()
      .should('not.contain', 'This field is required')

    cy.getByRole('button', { name: 'Disable Datepicker' }).click()
    cy.getByPlaceholder('Pick a date').should('be.disabled')

    cy.getByRole('button', { name: 'Enable Datepicker' }).click()
    cy.getByPlaceholder('Pick a date').should('not.be.disabled')

    cy.getByTestId('result').contains('"datepicker": "2023-10-21"')
  })
})
