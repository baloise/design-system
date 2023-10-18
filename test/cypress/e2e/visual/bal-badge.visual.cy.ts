describe('bal-badge', () => {
  describe('basic', () => {
    beforeEach(() => cy.visit('/components/bal-badge/test/bal-badge.visual.html').waitForDesignSystem())

    it('basic component', () => {
      cy.getByTestId('basic').compareSnapshot('badge-basic')
      cy.getByTestId('icon').compareSnapshot('badge-icon')
      cy.getByTestId('card').compareSnapshot('badge-card')
      cy.getByTestId('button').compareSnapshot('badge-button')
      cy.getByTestId('long-content').compareSnapshot('badge-long-content')
    })

    it('component variants', () => {
      cy.compareSnapshot('button-variants')
    })
  })
  describe('theming', () => {
    beforeEach(() => cy.visit('/components/bal-badge/test/bal-badge.theming.html').waitForDesignSystem())

    it('basic component', () => {
      cy.getByTestId('basic').compareSnapshot('badge-theming-basic')
    })
  })
})
