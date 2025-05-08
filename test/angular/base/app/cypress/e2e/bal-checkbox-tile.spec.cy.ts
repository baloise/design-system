describe('bal-checkbox tile', () => {
  beforeEach(() => {
    cy.visit('/').platform('desktop').waitForDesignSystem()
  })
  it('should change value', () => {
    cy.getByTestId('checkboxTiles').getByRole('label', { name: 'Kiwi' }).click()
    cy.get('body').click(0, 0)

    cy.getByTestId('checkboxTiles').shouldBeInvalid().getDescribingElement().contains('This field is required')

    cy.getByTestId('checkboxTiles').getByRole('label', { name: 'Kiwi' }).click()

    cy.getByTestId('checkboxTiles')
      .shouldBeValid()
      .getDescribingElement()
      .should('not.contain', 'This field is required')

    cy.getByRole('button', { name: 'Update Checkbox Buttons' }).click()

    cy.getByRole('button', { name: 'Disable Checkbox Buttons' }).click()
    cy.getByTestId('checkboxTiles').should('have.attr', 'aria-disabled', 'true')

    cy.getByRole('button', { name: 'Enable Checkbox Buttons' }).click()
    cy.getByTestId('checkboxTiles').should('have.attr', 'aria-disabled', 'false')

    cy.getByTestId('result').contains('"Apple"')
  })
})
