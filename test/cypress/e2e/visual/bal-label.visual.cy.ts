describe('bal-label', () => {
  beforeEach(() => cy.visit('/components/bal-label/test/bal-label.visual.html').waitForDesignSystem())

  it('basic component', () => {
    cy.platform('desktop')
    cy.getByTestId('basic').compareSnapshot('label-desktop')

    cy.platform('tablet')
    cy.getByTestId('basic').compareSnapshot('label-tablet')

    cy.platform('mobile')
    cy.getByTestId('basic').compareSnapshot('label-mobile')
  })

  it('component variants', () => {
    cy.platform('desktop')
    cy.compareSnapshot('label-variants-desktop')

    cy.platform('tablet')
    cy.compareSnapshot('label-variants-tablet')

    cy.platform('mobile')
    cy.compareSnapshot('label-variants-mobile')
  })

  it('custom size', () => {
    cy.platform('desktop')
    cy.compareSnapshot('field')
  })
})
