describe('theme-compact.visual', () => {
  beforeEach(() => cy.visit('/test/theme-compact.visual.html').waitForDesignSystem().platform('desktop'))

  it('basic', () => {
    cy.getByTestId('navbar').testVisual('theme-compact-navbar', { errorThreshold: 0.2 })
    cy.getByTestId('typography').testVisual('theme-compact-typography', { errorThreshold: 0.2 })
    cy.getByTestId('buttons').testVisual('theme-compact-buttons', { errorThreshold: 0.2 })
    cy.getByTestId('tags').testVisual('theme-compact-tags', { errorThreshold: 0.2 })
    cy.getByTestId('card').testVisual('theme-compact-card', { errorThreshold: 0.2 })
    cy.getByTestId('table').testVisual('theme-compact-table', { errorThreshold: 0.2 })
    cy.getByTestId('form').testVisual('theme-compact-form', { errorThreshold: 0.2 })
  })
})
