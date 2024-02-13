describe('bal-pagination', () => {
  context('a11y', () => {
    beforeEach(() => cy.platform('desktop').pageA11y('/components/bal-pagination/test/bal-pagination.a11y.html'))

    describe('have the AA standard', () => {
      it('pagination basic', () => {
        cy.getByTestId('basic').testA11y()
      })

      it('pagination small', () => {
        cy.getByTestId('small').testA11y()
      })

      it('pagination small with dots', () => {
        cy.getByTestId('small-with-dots').testA11y()
      })
    })
  })
})
