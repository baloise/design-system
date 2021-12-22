import { app } from '../support/app'

describe('Modal', () => {
  const page = app.getModalPage()

  it('should open and close Modal', () => {
    page.open()
    cy.get(page.openModalButton).click()
    cy.get(page.modal).balModalIsOpen()
    cy.get(page.closeModalButton).click()
  })

  it('should contain title', () => {
    page.open()
    cy.get(page.openModalButton).click()
    cy.get(page.modal).find('bal-modal-header').contains('Modal Title')
  })
})
