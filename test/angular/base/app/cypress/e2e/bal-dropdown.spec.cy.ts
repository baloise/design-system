describe('bal-dropdown', () => {
  beforeEach(() => {
    cy.visit('/').platform('desktop').waitForDesignSystem()
  })
  it('should change value', () => {
    cy.getByLabelText('Dropdown Label')
      .should('have.value', '')
      .click()
      .wait(32)
      .click()
      .blur()
      .shouldBeInvalid()
      .getDescribingElement()
      .contains('This field is required')

    cy.getByLabelText('Dropdown Label').click()
    cy.get('bal-dropdown').getByRole('option', { name: 'Kiwi' }).click()
    cy.getByLabelText('Dropdown Label')
      .should('have.value', 'Kiwi')
      .shouldBeValid()
      .getDescribingElement()
      .should('not.contain', 'This field is required')

    cy.getByRole('button', { name: 'Update Dropdown' }).click()
    cy.getByLabelText('Dropdown Label')
      .should('have.value', 'Apple')
      .shouldBeValid()
      .getDescribingElement()
      .should('not.contain', 'This field is required')

    cy.getByRole('button', { name: 'Disable Dropdown' }).click()
    cy.getByLabelText('Dropdown Label').should('be.disabled')

    cy.getByRole('button', { name: 'Enable Dropdown' }).click()
    cy.getByLabelText('Dropdown Label').should('not.be.disabled')

    cy.getByTestId('result').contains('"dropdown": "Apple"')
  })
})
