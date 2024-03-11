describe('bal-card', () => {
  context('a11y', () => {
    beforeEach(() => cy.platform('desktop').pageA11y('/components/bal-card/test/bal-card.a11y.html'))

    describe('have the AA standard', () => {
      it('basic', () => {
        cy.getByTestId('basic').testA11y()
      })
    })
  })
})
