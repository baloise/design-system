describe('bal-dropdown-multiple', () => {
  beforeEach(() => {
    cy.visit('/').platform('desktop').waitForDesignSystem()
  })
  it('should change value', () => {
    cy.getByLabelText('Dropdown Multiple Label').click()
    cy.getByTestId('dropdownMultiple').within(() => {
      cy.getByRole('option', { name: 'Kiwi' }).click()
    })
    cy.getByLabelText('Dropdown Multiple Label').click().blur()

    cy.getByLabelText('Dropdown Multiple Label')
      .shouldBeInvalid()
      .getDescribingElement()
      .contains('This field is required')

    cy.getByLabelText('Dropdown Multiple Label').click()
    cy.getByTestId('dropdownMultiple').within(() => {
      cy.getByRole('option', { name: 'Kiwi' }).click()
      cy.getByRole('option', { name: 'Mango' }).click()
    })
    cy.getByLabelText('Dropdown Multiple Label').click().blur()
    cy.getByLabelText('Dropdown Multiple Label').should('have.value', 'Mango,Kiwi')

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
