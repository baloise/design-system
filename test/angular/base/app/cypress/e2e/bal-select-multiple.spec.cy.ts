describe('bal-select-multiple', () => {
  beforeEach(() => {
    cy.visit('/').platform('desktop').waitForDesignSystem()
  })
  it('should change value', () => {
    cy.getByLabelText('Select Multiple Label').click()
    cy.getByTestId('selectMultiple').getByRole('button', { name: 'Kiwi' }).click()

    cy.get('body').type('{esc}')

    cy.getByLabelText('Select Multiple Label')
      .shouldBeInvalid()
      .getDescribingElement()
      .contains('This field is required')

    cy.getByLabelText('Select Multiple Label').click()
    cy.getByTestId('selectMultiple').getByRole('button', { name: 'Kiwi' }).click()
    cy.getByTestId('selectMultiple').getByRole('button', { name: 'Mango' }).click()
    cy.get('body').type('{esc}')
    // cy.getByTestId('selectMultiple').should('have.value', ['Kiwi', 'Mango'])
    cy.getByLabelText('Select Multiple Label')
      .shouldBeValid()
      .getDescribingElement()
      .should('not.contain', 'This field is required')

    cy.getByRole('button', { name: 'Disable Select Multiple' }).click()
    cy.getByLabelText('Select Multiple Label').should('be.disabled')

    cy.getByRole('button', { name: 'Enable Select Multiple' }).click()
    cy.getByLabelText('Select Multiple Label').should('not.be.disabled')

    cy.getByTestId('result').contains(`"Kiwi"`)
    cy.getByTestId('result').contains(`"Mango"`)
  })
})
