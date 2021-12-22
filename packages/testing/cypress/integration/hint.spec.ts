import { app } from '../support/app'

describe('Hint', () => {
  const page = app.getHintPage()

  it('should open and close the hint overlay', () => {
    page.open()
    cy.get(page.hint).balHintFindOverlay().should('not.be.visible')
    cy.get(page.hint).click().balHintFindOverlay().should('be.visible')
    cy.get(page.hint).balHintFindCloseButton().contains('Close').click()
    cy.get(page.hint).balHintFindOverlay().should('not.be.visible')
  })

  it('should contain spider man in the overlay', () => {
    page.open()
    cy.get(page.hint).click().balHintFindOverlay().contains('Spider-Man')
  })
})
