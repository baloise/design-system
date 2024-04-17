describe('bal-dropdown', () => {
  beforeEach(() => {
    cy.visit('/components/bal-dropdown/test/bal-dropdown.cy.html')
    cy.waitForDesignSystem()
  })

  it('should select label or value', () => {
    cy.getByTestId('basic').should('have.value', '1995')
    cy.getByTestId('basic').should('not.have.value', '1994')

    cy.getByTestId('basic').click().select('1996').should('have.value', '1996')
    cy.getByTestId('basic').click().select('v1997').should('have.value', '1997')
  })

  it('should be disabled', () => {
    cy.getByTestId('basic').should('not.be.disabled')
    cy.getByTestId('disabled').should('be.disabled')
  })

  it('should assert option labels', () => {
    cy.getByTestId('basic').balSelectFindOptions().should('have.length', 6)
    cy.getByTestId('basic').balSelectShouldHaveOptions(['1995', '1996', '1997', '1998', '1999', '2000'])
    cy.getByTestId('basic').balSelectShouldHaveOptions(['v1995', 'v1996', 'v1997', 'v1998', 'v1999', 'v2000'], 'value')
  })

  describe('multiple', () => {
    it('should select and deselect values', () => {
      cy.getByTestId('multiple')
        .click()
        .select(['Black Widow', 'Black Panter'])
        .should('have.value', ['Black Widow', 'Black Panter'])

      cy.getByTestId('multiple').balSelectFindOptions().first().click()
      cy.getByTestId('multiple').balSelectFindOptions().eq(1).click()
      cy.getByTestId('multiple').balSelectFindOptions().eq(2).click()
      cy.getByTestId('multiple').should('have.value', ['Iron Man'])
      cy.getByTestId('multiple').click()

      cy.getByTestId('multiple').balSelectFindChips().first().contains('Iron Man')
      cy.getByTestId('multiple').balSelectFindChips().first().click()
      cy.getByTestId('multiple').should('have.value', '')
    })
  })
})
