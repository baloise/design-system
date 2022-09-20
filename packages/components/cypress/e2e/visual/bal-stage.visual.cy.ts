describe('bal-stage', () => {
  it('basic component', () => {
    cy.page('/components/bal-stage/test/bal-stage.visual.html')

    cy.platform('desktop')
    cy.compareSnapshot('stage-basic', 0.0)

    cy.platform('tablet')
    cy.compareSnapshot('stage-basic-tablet', 0.0)

    cy.platform('mobile')
    cy.compareSnapshot('stage-basic-mobile', 0.0)
  })

  it('large stage', () => {
    cy.page('/components/bal-stage/test/bal-stage.large.visual.html')

    cy.platform('desktop')
    cy.compareSnapshot('stage-large', 0.0)

    cy.platform('tablet')
    cy.compareSnapshot('stage-large-tablet', 0.0)

    cy.platform('mobile')
    cy.compareSnapshot('stage-large-mobile', 0.0)
  })
})
