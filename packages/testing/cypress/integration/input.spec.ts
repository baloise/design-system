/* eslint-disable */
import { app } from '../support/app'

describe('Input', () => {
  const page = app.getInputPage()

  it('should have value and typeable', () => {
    page.open()
    cy.get(page.input).should('have.value', '')
    cy.get(page.input).type('bubu').should('have.value', 'bubu')
    cy.get(page.input).clear().should('not.have.value', 'bubu').should('have.value', '')
  })

  it('should have placeholder', () => {
    cy.get(page.input).should('have.attr', 'placeholder', 'Enter your firstname')
    cy.get(page.input).should('not.have.attr', 'placeholder', 'Enter your lastname')
  })

  it('should be disabled', () => {
    cy.get(page.input).should('not.be.disabled')
    cy.get(page.inputDisabled).should('be.disabled')
  })

  it('should be focusable', () => {
    cy.get(page.input).focus().should('be.focused')
    cy.get(page.input).blur().should('not.be.focused')
  })

  it('should only accept numbers', () => {
    cy.get(page.inputNumber).type('bubu').should('have.value', '')
    cy.get(page.inputNumber).type('1234').should('have.value', '1234').blur().should('have.value', '1’234')
    cy.get(page.inputDecimal).type('1234.5678').should('have.value', '1234.56').blur().should('have.value', '1’234.56')
  })

  it('should add suffix after blur', () => {
    cy.get(page.inputSuffix).type('100').should('have.value', '100').blur().should('have.value', '100 %')
  })
})
