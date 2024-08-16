// Need to skip this test since cypress has rendering issue and adds
// elements twice to the DOM.
describe.skip('bal-tabs', () => {
  context('a11y', () => {
    beforeEach(() => cy.platform('desktop').pageA11y('/components/bal-tabs/test/bal-tabs.a11y.html'))

    describe('have the AA standard', () => {
      it('tabs basic', () => {
        cy.getByTestId('basic').testA11y()
      })

      it('links', () => {
        cy.getByTestId('links').testA11y()
      })

      it('mixed', () => {
        cy.getByTestId('mixed').testA11y()
      })

      it('tabs vertical', () => {
        cy.getByTestId('vertical').testA11y()
      })
    })
  })
})
