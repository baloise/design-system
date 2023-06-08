describe('bal-stage', () => {
  it('basic component', () => {
    cy.visit('/components/bal-stage/test/bal-stage.visual.html').waitForDesignSystem()

    cy.platform('desktop')
    cy.compareSnapshot('stage-basic')

    cy.platform('tablet')
    cy.compareSnapshot('stage-basic-tablet')

    cy.platform('mobile')
    cy.compareSnapshot('stage-basic-mobile')
  })

  it('large stage', () => {
    cy.visit('/components/bal-stage/test/bal-stage.large.visual.html').waitForDesignSystem()

    cy.platform('desktop')
    cy.compareSnapshot('stage-large')

    cy.platform('tablet')
    cy.compareSnapshot('stage-large-tablet')

    cy.platform('mobile')
    cy.compareSnapshot('stage-large-mobile')
  })
})
