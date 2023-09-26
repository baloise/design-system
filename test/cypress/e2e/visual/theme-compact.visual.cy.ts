describe('theme-compact.visual', () => {
  beforeEach(() => cy.visit('/test/theme-compact.visual.html').platform('desktop').waitForDesignSystem())

  it('basic', () => {
    cy.getByTestId('navbar').compareSnapshot('theme-compact-navbar')
    cy.getByTestId('typography').compareSnapshot('theme-compact-typography')
    cy.getByTestId('buttons').compareSnapshot('theme-compact-buttons')
    cy.getByTestId('tags').compareSnapshot('theme-compact-tags')
    cy.getByTestId('card').compareSnapshot('theme-compact-card')
    cy.getByTestId('table').compareSnapshot('theme-compact-table')
    cy.getByTestId('form').compareSnapshot('theme-compact-form')
  })
})
