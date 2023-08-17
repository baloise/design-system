describe('bal-dropdown-multiple', () => {
  beforeEach(() => {
    cy.visit('/').platform('desktop').waitForDesignSystem()
  })
  it('should change value', () => {
    cy.getByLabelText('Dropdown Multiple Label').should('have.value', '').click().blur()

    cy.get('body').type('{esc}')

    cy.getByLabelText('Dropdown Multiple Label')
      .should('have.value', '')
      .shouldBeInvalid()
      .getDescribingElement()
      .contains('This field is required')

    cy.getByLabelText('Dropdown Multiple Label').click()
    cy.getByTestId('dropdownMultiple').getByRole('button', { name: 'Kiwi' }).click()
    cy.getByTestId('dropdownMultiple').getByRole('button', { name: 'Mango' }).click()
    cy.get('body').type('{esc}')
    // cy.getByTestId('dropdownMultiple').should('have.value', ['Kiwi', 'Mango'])
    cy.getByLabelText('Dropdown Multiple Label')
      .shouldBeValid()
      .getDescribingElement()
      .should('not.contain', 'This field is required')

    cy.getByRole('button', { name: 'Disable Dropdown Multiple' }).click()
    cy.getByLabelText('Dropdown Multiple Label').should('be.disabled')

    cy.getByRole('button', { name: 'Enable Dropdown Multiple' }).click()
    cy.getByLabelText('Dropdown Multiple Label').should('not.be.disabled')

    cy.getByTestId('result').contains(`"Kiwi"`)
    cy.getByTestId('result').contains(`"Mango"`)
  })
})
