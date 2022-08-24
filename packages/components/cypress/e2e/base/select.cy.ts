import { app } from '../../support/app'

describe('Select', () => {
  const page = app.getSelectPage()

  describe('select', () => {
    it('should select label or value', () => {
      page.open()
      cy.get(page.select).click().select('1995').should('have.value', '1995')
      cy.get(page.select).click().select('v1996').should('have.value', '1996')
    })

    it('should assert option labels', () => {
      page.open()
      cy.get(page.select).balSelectFindOptions().should('have.length', 6)
      cy.get(page.select).balSelectShouldHaveOptions(['1995', '1996', '1997', '1998', '1999', '2000'])
      cy.get(page.select).balSelectShouldHaveOptions(['v1995', 'v1996', 'v1997', 'v1998', 'v1999', 'v2000'], 'value')
    })

    it('Should be disabled', () => {
      page.open()
      cy.get(page.select).should('not.be.disabled')
      cy.get(page.selectDisabled).should('be.disabled')
    })
  })

  describe('typeahead', () => {
    it('should clear select and search for the Black Widow', () => {
      page.open()
      cy.get(page.typeahead).clear().type('Black{enter}').should('have.value', 'Black Widow')
    })
  })

  describe('multiple', () => {
    it('should ', () => {
      page.open()
      cy.get(page.multiple)
        .click()
        .select(['Black Widow', 'Black Panter'])
        .should('have.value', ['Black Widow', 'Black Panter'])
      cy.get(page.multiple).balSelectFindOptions().first().click()
      cy.get(page.multiple).balSelectFindOptions().eq(1).click()
      cy.get(page.multiple).balSelectFindOptions().eq(2).click()
      cy.get(page.multiple).should('have.value', ['Iron Man'])
      cy.get(page.multiple).balSelectFindChips().first().contains('Iron Man').click()
      cy.get(page.multiple).should('have.value', '')
    })
  })
})
