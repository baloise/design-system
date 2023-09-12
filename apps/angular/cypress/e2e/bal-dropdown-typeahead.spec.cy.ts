describe('bal-dropdown-typeahead', () => {
  beforeEach(() => {
    cy.visit('/').platform('desktop').waitForDesignSystem()
  })
  it('should change value', () => {
    cy.getByLabelText('Typeahead Label').should('have.value', 'Kiwi').clear().blur()

    cy.get('body').type('{esc}')

    cy.getByLabelText('Typeahead Label')
      .should('have.value', '')
      .shouldBeInvalid()
      .getDescribingElement()
      .contains('This field is required')

    cy.getByLabelText('Typeahead Label').click().type('Kiwi').type('{enter}').blur()
    cy.get('body').type('{esc}')

    cy.getByLabelText('Typeahead Label')
      .should('have.value', 'Kiwi')
      .shouldBeValid()
      .getDescribingElement()
      .should('not.contain', 'This field is required')

    cy.getByRole('button', { name: 'Update Typeahead' }).click()
    cy.getByLabelText('Typeahead Label')
      .should('have.value', 'Apple')
      .shouldBeValid()
      .getDescribingElement()
      .should('not.contain', 'This field is required')

    cy.getByRole('button', { name: 'Disable Typeahead' }).click()
    cy.getByLabelText('Typeahead Label').should('be.disabled')

    cy.getByRole('button', { name: 'Enable Typeahead' }).click()
    cy.getByLabelText('Typeahead Label').should('not.be.disabled')

    cy.getByTestId('result').contains('"typeahead": "Apple"')
  })
})
