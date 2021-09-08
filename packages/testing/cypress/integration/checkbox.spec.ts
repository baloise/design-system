import { app } from '../support/app'

describe('Checkbox', () => {
  let page = app.getCheckboxPage()

  it('should contain label', () => {
    page.open()
    cy.get(page.normalCheckboxElement).contains('Label')
  })

  it('should be checkable', () => {
    page.open()
    cy.get(page.normalCheckboxElement).should('not.be.checked')
    cy.get(page.normalCheckboxElement).check()
    cy.get(page.normalCheckboxElement).should('be.checked')
    cy.get(page.normalCheckboxElement).check()
    cy.get(page.normalCheckboxElement).should('not.be.checked')
  })

  it('should be disableable', () => {
    page.open()
    cy.get(page.normalCheckboxElement).should('not.be.disabled')
    cy.get(page.disabledCheckboxElement).should('be.disabled')
  })

  it.only('should be focusable', () => {
    page.open()
    cy.get(page.normalCheckboxElement).should('not.be.focused')
    cy.get(page.normalCheckboxElement).focus()
    cy.get(page.normalCheckboxElement).should('be.focused')
  })
})
