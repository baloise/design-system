describe('bal-time', () => {
  beforeEach(() => {
    cy.visit('/').platform('desktop').waitForDesignSystem()
  })
  it('should change value', () => {
    cy.getByLabelText('Time Label').should('have.value', '').click().blur()
    // .shouldBeInvalid()
    // .getDescribingElement()
    // .contains('This field is required')

    cy.getByPlaceholder('hh:mm').type('12:45').blur().should('have.value', '12:45')
    // .shouldBeValid()
    // .getDescribingElement()
    // .should('not.contain', 'This field is required')

    cy.getByRole('button', { name: 'Update Time' }).click()
    cy.getByPlaceholder('hh:mm').should('have.value', '09:30')
    // .shouldBeValid()
    // .getDescribingElement()
    // .should('not.contain', 'This field is required')

    cy.getByRole('button', { name: 'Disable Time' }).click()
    cy.getByPlaceholder('hh:mm').should('be.disabled')

    cy.getByRole('button', { name: 'Enable Time' }).click()
    cy.getByPlaceholder('hh:mm').should('not.be.disabled')

    cy.getByTestId('result').contains('"time": "09:30"')
  })
})
