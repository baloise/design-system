describe('bal-select', () => {
  beforeEach(() => {
    cy.visit('/components/bal-select/test/bal-select.cy.html')
    cy.waitForDesignSystem()
  })

  it('should select label or value', () => {
    cy.getByTestId('select').should('have.value', '2000')
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

  describe.only('typeahead', () => {
    it('should clear select and search for the Black Widow', () => {
      cy.getByTestId('typeahead').clear().blur()
      cy.getByTestId('typeahead').type('Black{downArrow}{enter}').blur().should('have.value', 'Black Widow')
    })
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
      cy.getByTestId('multiple').balSelectFindChips().first().contains('Iron Man').click()
      cy.getByTestId('multiple').should('have.value', '')
      cy.get('body').click()
    })
  })

  describe('form reset', () => {
    it('should restore initial value when it has been reset', () => {
      // First we change the initial values to 1995
      cy.getByTestId('reset-basic').click().select('1995')
      cy.getByTestId('reset-typeahead').clear().type('1995{downArrow}{enter}')
      cy.getByTestId('reset-multiple').click().balSelectFindOptions().first().click()
      cy.getByTestId('reset-multiple').balSelectFindOptions().eq(1).click()
      cy.getByTestId('reset-multiple').balSelectFindOptions().eq(2).click()
      cy.getByTestId('reset-multiple-typeahead').click({ force: true }).click().balSelectFindOptions().first().click()
      cy.getByTestId('reset-multiple-typeahead').balSelectFindOptions().eq(1).click()
      cy.getByTestId('reset-multiple-typeahead').balSelectFindOptions().eq(2).click()
      cy.getByTestId('reset-typeahead-remote').click({ force: true }).click().balSelectFindOptions().first().click()

      // Values are changed form the initial one
      cy.getByTestId('reset-basic').should('have.value', '1995')
      cy.getByTestId('reset-typeahead').should('have.value', '1995')
      cy.getByTestId('reset-multiple').should('have.value', ['1995'])
      cy.getByTestId('reset-multiple-typeahead').should('have.value', ['1995'])
      cy.getByTestId('reset-typeahead-remote').should('have.value', '1995')

      // Reset form and check if initial value is restored
      cy.getByTestId('reset-button').click()
      cy.getByTestId('reset-basic').should('have.value', '1996')
      cy.getByTestId('reset-typeahead').should('have.value', '1996')
      cy.getByTestId('reset-multiple').should('have.value', ['1996', '1997'])
      cy.getByTestId('reset-multiple-typeahead').should('have.value', ['1996', '1997'])
      cy.getByTestId('reset-typeahead-remote').should('have.value', '1996')
    })
  })
})
