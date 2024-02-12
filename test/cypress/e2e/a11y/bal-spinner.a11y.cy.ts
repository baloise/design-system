describe('bal-spinner', () => {
  context('a11y', () => {
    beforeEach(() => cy.platform('desktop').pageA11y('/components/bal-spinner/test/bal-spinner.a11y.html'))

    describe('have the AA standard', () => {
      it('basic', () => {
        cy.getByTestId('basic').testA11y()
      })

      it('small', () => {
        cy.getByTestId('small').testA11y()
      })

      it('inverted', () => {
        cy.getByTestId('inverted').testA11y()
      })
    })
  })
})
