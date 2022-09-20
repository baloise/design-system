describe('bal-accordion', () => {
  before(() => cy.page('/components/bal-accordion/test/bal-accordion.visual.html'))

  it('basic component', () => {
    cy.platform('desktop')
    cy.getByTestId('basic').compareSnapshot('accordion-desktop', 0.0)

    cy.platform('tablet')
    cy.getByTestId('basic').compareSnapshot('accordion-desktop', 0.0)

    cy.platform('mobile')
    cy.getByTestId('basic').compareSnapshot('accordion-desktop', 0.0)
  })

  it('component variants', () => {
    cy.platform('desktop')
    cy.compareSnapshot('accordion-variants', 0.0)

    cy.platform('tablet')
    cy.compareSnapshot('accordion-variants-tablet', 0.0)

    cy.platform('mobile')
    cy.compareSnapshot('accordion-variants-mobile', 0.0)
  })
})
