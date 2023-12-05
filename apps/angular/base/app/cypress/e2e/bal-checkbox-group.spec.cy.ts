describe('bal-checkbox-group', () => {
  beforeEach(() => {
    cy.visit('/').platform('desktop').waitForDesignSystem()
  })
  it('should change value', () => {
    cy.getByLabelText('Checkbox Group Label')

    cy.getByTestId('checkboxGroup').getByRole('label', { name: 'Kiwi' }).click()
    cy.get('body').click(0, 0)

    cy.getByLabelText('Checkbox Group Label')
      .shouldBeInvalid()
      .getDescribingElement()
      .contains('This field is required')

    cy.getByTestId('checkboxGroup').getByRole('label', { name: 'Kiwi' }).click()

    cy.getByLabelText('Checkbox Group Label')
      .shouldBeValid()
      .getDescribingElement()
      .should('not.contain', 'This field is required')

    cy.getByRole('button', { name: 'Update Checkbox Group' }).click()

    cy.getByRole('button', { name: 'Disable Checkbox Group' }).click()
    cy.getByLabelText('Checkbox Group Label').should('be.disabled')

    cy.getByRole('button', { name: 'Enable Checkbox Group' }).click()
    cy.getByLabelText('Checkbox Group Label').should('not.be.disabled')

    cy.getByTestId('result').contains('"Apple"')
  })
})
