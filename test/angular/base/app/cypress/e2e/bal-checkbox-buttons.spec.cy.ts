describe('bal-checkbox tile', () => {
  beforeEach(() => {
    cy.visit('/').platform('desktop').waitForDesignSystem()
  })
  it('should change value', () => {
    cy.getByLabelText('Checkbox Tiles Label')

    cy.getByTestId('checkboxTiles').getByRole('label', { name: 'Kiwi' }).click()
    cy.get('body').click(0, 0)

    cy.getByLabelText('Checkbox Buttons Label')
      .shouldBeInvalid()
      .getDescribingElement()
      .contains('This field is required')

    cy.getByTestId('checkboxTiles').getByRole('label', { name: 'Kiwi' }).click()

    cy.getByLabelText('Checkbox Tiles Label')
      .shouldBeValid()
      .getDescribingElement()
      .should('not.contain', 'This field is required')

    cy.getByRole('button', { name: 'Update Checkbox Buttons' }).click()

    cy.getByRole('button', { name: 'Disable Checkbox Buttons' }).click()
    cy.getByLabelText('Checkbox Tiles Label').should('be.disabled')

    cy.getByRole('button', { name: 'Enable Checkbox Buttons' }).click()
    cy.getByLabelText('Checkbox Tiles Label').should('not.be.disabled')

    cy.getByTestId('result').contains('"Apple"')
  })
})
