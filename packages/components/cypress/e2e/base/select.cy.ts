describe('Select', () => {
  before(() => {
    cy.platform('desktop').page('/components/form/bal-select/test/bal-select.cy.html')
  })

  it('should select label or value', () => {
    cy.getByTestId('select').click().select('1995').should('have.value', '1995')
    cy.getByTestId('select').click().select('v1996').should('have.value', '1996')
  })

  it('should assert option labels', () => {
    cy.getByTestId('select').balSelectFindOptions().should('have.length', 6)
    cy.getByTestId('select').balSelectShouldHaveOptions(['1995', '1996', '1997', '1998', '1999', '2000'])
    cy.getByTestId('select').balSelectShouldHaveOptions(['v1995', 'v1996', 'v1997', 'v1998', 'v1999', 'v2000'], 'value')
  })

  it('Should be disabled', () => {
    cy.getByTestId('select').should('not.be.disabled')
    cy.getByTestId('select-disabled').should('be.disabled')
  })

  describe('typeahead', () => {
    it('should clear select and search for the Black Widow', () => {
      cy.getByTestId('typeahead').clear()
      cy.getByTestId('typeahead').type('Black{enter}').should('have.value', 'Black Widow')
    })
  })

  describe('multiple', () => {
    it('should ', () => {
      cy.getByTestId('multiple')
        .click()
        .select(['Black Widow', 'Black Panter'])
        .should('have.value', ['Black Widow', 'Black Panter'])
      cy.getByTestId('multiple').balSelectFindOptions().first().click()
      cy.getByTestId('multiple').balSelectFindOptions().eq(1).click()
      cy.getByTestId('multiple').balSelectFindOptions().eq(2).click()
      cy.getByTestId('multiple').should('have.value', ['Iron Man'])
      cy.getByTestId('multiple').balSelectFindChips().first().contains('Iron Man').click()
      cy.getByTestId('multiple').should('have.value', '')
    })
  })
})
