describe('bal-steps', () => {
  context('a11y', () => {
    beforeEach(() => cy.platform('desktop').pageA11y('/components/bal-steps/test/bal-steps.a11y.html'))

    describe('have the AA standard', () => {
      it('steps basic', () => {
        cy.getByTestId('basic').testA11y()
      })
    })
  })
})
