describe('bal-badge', () => {
  describe('basic', () => {
    beforeEach(() => cy.visit('/components/bal-badge/test/bal-badge.visual.html').waitForDesignSystem())

    it('basic component', () => {
      cy.getByTestId('basic').testVisual('badge-basic')
      cy.getByTestId('icon').testVisual('badge-icon')
      cy.getByTestId('card').testVisual('badge-card')
      cy.getByTestId('button').testVisual('badge-button')
      cy.getByTestId('long-content').testVisual('badge-long-content')
    })

    it('component variants', () => {
      cy.testVisual('button-variants')
    })
  })
  describe('theming', () => {
    beforeEach(() => cy.visit('/components/bal-badge/test/bal-badge.theming.html').waitForDesignSystem())

    it('basic component', () => {
      cy.getByTestId('basic').testVisual('badge-theming-basic')
    })
  })
})
