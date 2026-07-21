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
})
