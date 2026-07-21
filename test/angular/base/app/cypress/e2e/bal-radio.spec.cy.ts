describe('bal-radio', () => {
  beforeEach(() => {
    cy.visit('/').platform('desktop').waitForDesignSystem()
  })
  it('should change value', () => {
    cy.getByLabelText('Radio Label')

    cy.getByTestId('radio').getByRole('label', { name: 'Mango' }).click()
    cy.get('body').click(0, 0)

    cy.getByTestId('radio').shouldBeValid()

    cy.getByRole('button', { name: 'Update Radio' }).click()

    cy.getByRole('button', { name: 'Disable Radio' }).click()
    cy.getByLabelText('Radio Label').should('be.disabled')

    cy.getByRole('button', { name: 'Enable Radio' }).click()
    cy.getByLabelText('Radio Label').should('not.be.disabled')

    cy.getByTestId('result').contains('"radio": "Apple",')
  })
})
