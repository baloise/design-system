describe('bal-content', () => {
  context('a11y', () => {
    beforeEach(() => cy.pageA11y('/components/bal-content/test/bal-content.a11y.html'))

    describe('have the AA standard', () => {
      it('basic', () => {
        cy.getByTestId('basic').testA11y()
      })
    })
  })
})
