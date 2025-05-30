describe('bal-date', () => {
  beforeEach(() => {
    cy.visit('/').platform('desktop').waitForDesignSystem()
  })
  it('should change value', () => {
    cy.getByLabelText('Date Label').should('have.value', '09.09.2023').clear().click()
    cy.get('body').click(0, 0)

    cy.getByLabelText('Date Label').shouldBeInvalid().getDescribingElement().contains('This field is required')

    cy.getByPlaceholder('Enter a date').type('20.02.2024')
    cy.get('body').click(0, 0)

    cy.getByPlaceholder('Enter a date')
      .should('have.value', '20.02.2024')
      .shouldBeValid()
      .getDescribingElement()
      .should('not.contain', 'This field is required')

    cy.get('body').type('{esc}')

    cy.getByRole('button', { name: 'Update Date' }).click()
    cy.getByPlaceholder('Enter a date')
      .should('have.value', '21.10.2023')
      .shouldBeValid()
      .getDescribingElement()
      .should('not.contain', 'This field is required')

    cy.getByRole('button', { name: 'Disable Date' }).click()
    cy.getByPlaceholder('Enter a date').should('be.disabled')

    cy.getByRole('button', { name: 'Enable Date' }).click()
    cy.getByPlaceholder('Enter a date').should('not.be.disabled')

    cy.getByTestId('result').contains('"date": "2023-10-21"')
  })
})
