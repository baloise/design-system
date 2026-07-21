describe('bal-checkbox', () => {
  beforeEach(() => {
    cy.visit('/').platform('desktop').waitForDesignSystem()
  })
  it('should change value', () => {
    cy.getByLabelText('Checkbox Label').should('not.be.checked').closest('bal-checkbox').find('label').click().click()

    cy.getByLabelText('Checkbox Label').shouldBeInvalid().getDescribingElement().contains('This field is required')

    cy.getByLabelText('Checkbox Label').closest('bal-checkbox').find('label').click()
    cy.getByLabelText('Checkbox Label')
      .should('be.checked')
      .shouldBeValid()
      .getDescribingElement()
      .should('not.contain', 'This field is required')

    cy.getByRole('button', { name: 'Update Checkbox' }).click()
    cy.getByLabelText('Checkbox Label').should('not.be.checked')

    cy.getByRole('button', { name: 'Disable Checkbox' }).click()
    cy.getByLabelText('Checkbox Label').should('be.disabled')

    cy.getByRole('button', { name: 'Enable Checkbox' }).click()
    cy.getByLabelText('Checkbox Label').should('not.be.disabled')

    cy.getByTestId('result').contains('"checkbox": false')
  })
})
