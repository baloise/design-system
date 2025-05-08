describe('bal-checkbox-group', () => {
  beforeEach(() => {
    cy.visit('/').platform('desktop').waitForDesignSystem()
  })
  it('should change value', () => {
    cy.getByLabelText('Checkbox Group Label')

    cy.getByTestId('checkboxGroup').getByRole('label', { name: 'Kiwi' }).click()
    cy.get('body').click(0, 0)

    cy.getByTestId('checkboxGroup').shouldBeInvalid().getDescribingElement().contains('This field is required')

    cy.getByTestId('checkboxGroup').getByRole('label', { name: 'Kiwi' }).click()

    cy.getByTestId('checkboxGroup')
      .shouldBeValid()
      .getDescribingElement()
      .should('not.contain', 'This field is required')

    cy.getByRole('button', { name: 'Update Checkbox Group' }).click()

    cy.getByRole('button', { name: 'Disable Checkbox Group' }).click()
    cy.getByTestId('checkboxGroup').should('have.attr', 'aria-disabled', 'true')

    cy.getByRole('button', { name: 'Enable Checkbox Group' }).click()
    cy.getByTestId('checkboxGroup').should('have.attr', 'aria-disabled', 'false')

    cy.getByTestId('result').contains('"Apple"')
  })
})
