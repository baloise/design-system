describe('bal-tabs', () => {
  context('a11y', () => {
    beforeEach(() => cy.platform('desktop').pageA11y('/components/bal-tabs/test/bal-tabs.a11y.html'))

    describe('have the AA standard', () => {
      it('tabs basic', () => {
        cy.getByTestId('basic').testA11y()
      })
    })
  })
})
