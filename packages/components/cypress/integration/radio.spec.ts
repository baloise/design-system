import { app } from '../support/app'

describe('Radio', () => {
  const page = app.getRadioPage()

  it('should select the 1st radio', () => {
    page.open()
    cy.get(page.radio).find('bal-radio').first().check().should('be.checked')
    cy.get(page.radio).find('bal-radio').eq(1).should('not.be.checked')
    cy.get(page.radio).find('bal-radio').eq(2).should('not.be.checked')
    cy.get(page.radio).find('bal-radio').eq(3).should('not.be.checked')
  })

  it('should contain label', () => {
    page.open()
    cy.get(page.radio).find('bal-radio').first().contains('Label 1')
  })

  it('should be disableable', () => {
    page.open()
    cy.get(page.radio).find('bal-radio').first().should('not.be.disabled')
    cy.get(page.radio).find('bal-radio').last().should('be.disabled')
  })

  it.only('should be focusable', () => {
    page.open()
    cy.get(page.radio).find('bal-radio').first().should('not.be.focused')
    cy.get(page.radio).find('bal-radio').first().focus()
    cy.get(page.radio).find('bal-radio').first().should('be.focused')
  })

  it.only('should select second select button', () => {
    page.open()
    cy.get(page.selectButton).find('bal-radio').eq(1).check().should('be.checked')
    cy.get(page.selectButton).find('bal-radio').first().should('not.be.checked')
    cy.get(page.selectButton).find('bal-radio').last().should('not.be.checked')
  })
})
