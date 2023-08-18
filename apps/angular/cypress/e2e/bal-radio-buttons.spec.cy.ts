describe('bal-radio-buttons', () => {
  beforeEach(() => {
    cy.visit('/').platform('desktop').waitForDesignSystem()
  })
  it('should change value', () => {
    cy.getByLabelText('Radio Buttons Label')

    cy.getByTestId('radioButtons').getByRole('label', { name: 'Mango' }).click()
    cy.get('body').click(0, 0)

    cy.getByTestId('radioButtons').shouldBeValid()

    cy.getByRole('button', { name: 'Update Radio Buttons' }).click()

    cy.getByRole('button', { name: 'Disable Radio Buttons' }).click()
    cy.getByLabelText('Radio Buttons Label').should('be.disabled')

    cy.getByRole('button', { name: 'Enable Radio Buttons' }).click()
    cy.getByLabelText('Radio Buttons Label').should('not.be.disabled')

    cy.getByTestId('result').contains('"radioButtons": "Apple"')
  })
})
