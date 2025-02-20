describe('theme-compact.visual', () => {
  beforeEach(() => cy.visit('/test/theme-compact.visual.html').waitForDesignSystem().platform('desktop'))

  it('basic', () => {
    cy.getByTestId('navbar').testVisual('theme-compact-navbar')
    cy.getByTestId('typography').testVisual('theme-compact-typography')
    cy.getByTestId('buttons').testVisual('theme-compact-buttons')
    cy.getByTestId('tags').testVisual('theme-compact-tags')
    cy.getByTestId('card').testVisual('theme-compact-card')
    cy.getByTestId('table').testVisual('theme-compact-table')
    cy.getByTestId('form').testVisual('theme-compact-form')
  })
})
