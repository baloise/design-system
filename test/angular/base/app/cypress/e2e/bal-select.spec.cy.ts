describe('bal-select', () => {
  beforeEach(() => {
    cy.visit('/').platform('desktop').waitForDesignSystem()
  })
  it('should change value', () => {
    cy.getByLabelText('Select Label').should('have.value', 'Kiwi')
    // .shouldBeInvalid()
    // .getDescribingElement()
    // .contains('This field is required')

    cy.getByLabelText('Select Label').click().waitForComponents()
    cy.get('bal-select').getByRole('button', { name: 'Kiwi' }).click().waitForComponents()
    cy.getByLabelText('Select Label')
      .should('have.value', 'Kiwi')
      .shouldBeValid()
      .getDescribingElement()
      .should('not.contain', 'This field is required')

    cy.getByRole('button', { name: 'Update Select' }).click()
    cy.getByLabelText('Select Label')
      .should('have.value', 'Apple')
      .shouldBeValid()
      .getDescribingElement()
      .should('not.contain', 'This field is required')

    cy.getByRole('button', { name: 'Disable Select' }).click()
    cy.getByLabelText('Select Label').should('be.disabled')

    cy.getByRole('button', { name: 'Enable Select' }).click()
    cy.getByLabelText('Select Label').should('not.be.disabled')

    cy.getByTestId('result').contains('"select": "Apple"')
  })
})
