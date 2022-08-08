import { app } from '../../support/app'

describe('Toast', () => {
  const page = app.getToastPage()

  it('should navigate to Toast page and open Toast', () => {
    page.open()
    cy.get(page.toast).click()
    cy.get(page.toastWarning).click()
    cy.balToastFind().first().contains('Hi I am a default Toast! Hi I am a default Toast!')
    cy.balToastFind().eq(1).contains('Warning!')
  })
})
