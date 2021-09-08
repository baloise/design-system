import { app } from '../support/app'

describe('Toast', () => {
  let page = app.getToastPage()

  it('should navigate to Toast page and open Toast', () => {
    page.open()
    cy.get(page.toast).click()
    cy.get(page.toastWarning).click()
    cy.balToastFind().first().contains('Hi I am a default Toast! Hi I am a default Toast!')
    cy.wait(1000).balToastFind().first().contains('Warning!').should('be.visible')
  })
})
