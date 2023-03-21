describe('bal-stage', () => {
  it('basic component', () => {
    cy.visit('/components/bal-stage/test/bal-stage.visual.html').waitForDesignSystem()

    cy.platform('desktop')
    cy.compareSnapshot('stage-basic', 0.0)

    cy.platform('tablet')
    cy.compareSnapshot('stage-basic-tablet', 0.0)

    cy.platform('mobile')
    cy.compareSnapshot('stage-basic-mobile', 0.0)
  })

  it('large stage', () => {
    cy.visit('/components/bal-stage/test/bal-stage.large.visual.html').waitForDesignSystem()

    cy.platform('desktop')
    cy.compareSnapshot('stage-large', 0.0)

    cy.platform('tablet')
    cy.compareSnapshot('stage-large-tablet', 0.0)

    cy.platform('mobile')
    cy.compareSnapshot('stage-large-mobile', 0.0)
  })
})
