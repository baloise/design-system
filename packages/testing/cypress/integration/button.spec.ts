import { app } from '../support/app'

describe('Button', () => {
  const page = app.getButtonPage()

  it('should contain label', () => {
    page.open()
    cy.get(page.primaryButton).contains('Continue')
    cy.get(page.primaryButtonDisabled).contains('Primary')
  })

  it('should be clickable & focusable', () => {
    page.open()
    cy.get(page.primaryButton).click().should('be.focused').blur().should('not.be.focused')
  })

  it('should be disabled or not', () => {
    page.open()
    cy.get(page.primaryButton).should('not.be.disabled')
    cy.get(page.primaryButtonDisabled).should('be.disabled')
  })
})
