describe('bal-tag', () => {
  context('a11y', () => {
    beforeEach(() => cy.platform('desktop').pageA11y('/components/bal-sheet/test/bal-sheet.a11y.html'))

    describe('have the AA standard', () => {
      it('basic', () => {
        cy.getByTestId('basic').testA11y()
      })
    })
  })
})
