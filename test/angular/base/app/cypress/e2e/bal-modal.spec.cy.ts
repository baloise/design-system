describe('bal-modal', () => {
  beforeEach(() => {
    cy.visit('/').platform('desktop').waitForDesignSystem()
  })
  it('should change value', () => {
    cy.getByTestId('result-modal').invoke('text').invoke('trim').should('equal', '')
    cy.getByRole('button', { name: 'Open Modal' }).click()
    cy.waitForBrowser()
    cy.getByRole('button', { name: 'Okay' }).click()
    cy.getByTestId('result-modal').contains('"firstName": "Peter"')
    cy.getByTestId('result-modal').contains('"lastName": "Parker"')
  })

  it('should render values that are already set when the overlay is created', () => {
    cy.getByRole('button', { name: 'Open Modal' }).click()
    cy.waitForBrowser()

    cy.getByTestId('modal-amount-property').find('input').should('have.value', '42.15 CHF')
    cy.getByTestId('modal-amount-control').find('input').should('have.value', '815.50 CHF')
  })
})
