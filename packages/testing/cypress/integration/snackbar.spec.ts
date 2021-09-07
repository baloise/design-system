import { app } from '../support/app'

describe('Snackbar', () => {
  let page = app.getSnackbarPage()

  it('should open snackbars and check their content', () => {
    page.open()
    cy.get(page.snackbar).click()
    cy.get(page.snackbarWarning).click()
    cy.balSnackbarFind().first().contains('Hi I am a default Snack!')
    cy.balSnackbarFind().eq(1).contains('Warning!')
  })
})
