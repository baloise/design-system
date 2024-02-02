describe('bal-select', () => {
  context('a11y', () => {
    beforeEach(() => cy.platform('desktop').pageA11y('/components/bal-select/test/bal-select.a11y.html'))

    describe('have the AA standard', () => {
      it('select basic', () => {
        cy.getByTestId('basic').testA11y()
      })
    })
  })
})
