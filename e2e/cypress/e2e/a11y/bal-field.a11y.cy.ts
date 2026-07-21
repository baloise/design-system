describe('bal-field', () => {
  context('a11y', () => {
    beforeEach(() => cy.platform('desktop').pageA11y('/components/bal-field/test/bal-field.a11y.html'))

    describe('have the AA standard', () => {
      it('basic', () => {
        cy.getByTestId('basic').testA11y()
      })

      it('states', () => {
        cy.getByTestId('disabled').testA11y()
        cy.getByTestId('invalid').testA11y()
      })

      it('horizontal', () => {
        cy.getByTestId('horizontal').testA11y()
      })
    })
  })
})
