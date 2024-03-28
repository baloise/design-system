describe('bal-option-list', () => {
  describe('basic', () => {
    beforeEach(() => cy.visit('/components/bal-option-list/test/bal-option-list.visual.html').waitForDesignSystem())

    it('basic component', () => {
      cy.getByTestId('basic').testVisual('option-basic')
    })
  })
})
