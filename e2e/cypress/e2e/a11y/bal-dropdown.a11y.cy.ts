describe('bal-dropdown', () => {
  beforeEach(() => {
    cy.pageA11y('/components/bal-dropdown/test/bal-dropdown.a11y.html')
    cy.platform('desktop')
    cy.waitForDesignSystem()
  })

  it('inital state', () => {
    cy.get('main').testA11y()
  })

  it('selected state', () => {
    cy.getByLabelText('Year').click()
    cy.getByRole('option', { name: 'v1990' }).click()
    cy.get('main').testA11y()
  })
})
