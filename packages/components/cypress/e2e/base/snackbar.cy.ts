describe('bal-snackbar', () => {
  before(() => {
    cy.platform('desktop').page('/components/notice/bal-snackbar/test/bal-snackbar.cy.html')
  })

  it('should open snackbars and check their content', () => {
    cy.getByTestId('snack').click()
    cy.getByTestId('snack-warning').click()
    cy.balSnackbarFind().first().contains('Hi I am a default Snack!')
    cy.balSnackbarFind().eq(1).contains('Warning!')
  })
})
