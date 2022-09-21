describe('bal-badge', () => {
  before(() => cy.page('/components/bal-badge/test/bal-badge.visual.html'))

  it('basic component', () => {
    cy.getByTestId('basic').compareSnapshot('badge-basic', 0.0)
    cy.getByTestId('icon').compareSnapshot('badge-icon', 0.0)
    cy.getByTestId('card').compareSnapshot('badge-card', 0.0)
    cy.getByTestId('button').compareSnapshot('badge-button', 0.0)
  })

  it('component variants', () => {
    cy.compareSnapshot('button-variants', 0.0)
  })
})
