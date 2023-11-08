describe('bal-snackbar', () => {
  beforeEach(() => {
    cy.visit('/components/bal-snackbar/test/bal-snackbar.cy.html')
    cy.waitForDesignSystem()
  })

  it('should open snackbars and check their content', () => {
    cy.getByTestId('snack').click()
    cy.getByTestId('snack-warning').click()
    cy.balSnackbarFind().first().contains('Hi I am a default Snack!')
    cy.balSnackbarFind().eq(1).contains('Warning!')
  })
})
