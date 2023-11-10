describe('bal-heading', () => {
  beforeEach(() => cy.visit('/components/bal-heading/test/bal-heading.visual.html').waitForDesignSystem())

  it('basic component', () => {
    cy.platform('desktop')
    cy.getByTestId('basic').compareSnapshot('heading-desktop')

    cy.platform('tablet')
    cy.getByTestId('basic').compareSnapshot('heading-tablet')

    cy.platform('mobile')
    cy.getByTestId('basic').compareSnapshot('heading-mobile')
  })

  it('component variants', () => {
    cy.platform('desktop')
    cy.compareSnapshot('heading-variants-desktop')

    cy.platform('tablet')
    cy.compareSnapshot('heading-variants-tablet')

    cy.platform('mobile')
    cy.compareSnapshot('heading-variants-mobile')
  })
})
