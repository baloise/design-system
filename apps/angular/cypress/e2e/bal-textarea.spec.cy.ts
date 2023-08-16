describe('bal-textarea', () => {
  beforeEach(() => {
    cy.visit('/').platform('desktop').waitForDesignSystem()
  })
  it('should change value', () => {
    cy.getByLabelText('Textarea Label').should('have.value', '').click().blur()
    //   .shouldBeInvalid()
    //   .getDescribingElement()
    //   .contains('This field is required')

    // cy.getByPlaceholder('Enter comment')
    //   .type('Hello World')
    //   .blur()
    //   .should('have.value', 'Hello World')
    //   .shouldBeValid()
    //   .getDescribingElement()
    //   .should('not.contain', 'This field is required')

    // cy.getByRole('button', { name: 'Update Textarea' }).click()
    // cy.getByPlaceholder('Enter comment')
    //   .should('have.value', 'updated value')
    //   .shouldBeValid()
    //   .getDescribingElement()
    //   .should('not.contain', 'This field is required')

    // cy.getByRole('button', { name: 'Disable Textarea' }).click()
    // cy.getByPlaceholder('Enter comment').should('be.disabled')

    // cy.getByRole('button', { name: 'Enable Textarea' }).click()
    // cy.getByPlaceholder('Enter comment').should('not.be.disabled')

    // cy.getByTestId('result').contains('"textarea": "updated value"')
  })
})
