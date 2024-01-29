describe('bal-time-input', () => {
  context('a11y', () => {
    beforeEach(() => cy.platform('desktop').pageA11y('/components/bal-time-input/test/bal-time-input.a11y.html'))

    describe('have the AA standard', () => {
      it('basic', () => {
        cy.getByTestId('basic').testA11y()
      })

      it('with value', () => {
        cy.getByTestId('with-value').testA11y()
      })

      it('states', () => {
        cy.getByTestId('disabled').testA11y()
        cy.getByTestId('invalid').testA11y()
      })
    })
  })
})
