describe('bal-toast', () => {
  before(() => cy.page('/components/notice/bal-toast/test/bal-toast.cy.html'))

  it('should navigate to Toast page and open Toast', () => {
    cy.getByTestId('toast').click()
    cy.getByTestId('toast-warning').click()
    cy.balToastFind().first().contains('Hi I am a default Toast! Hi I am a default Toast!')
    cy.balToastFind().eq(1).contains('Warning!')
  })
})
