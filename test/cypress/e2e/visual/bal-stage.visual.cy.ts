describe('bal-stage', () => {
  it('basic component', () => {
    cy.visit('/components/bal-stage/test/bal-stage.visual.html').waitForDesignSystem()

    cy.platform('desktop')
    cy.testVisual('stage-basic')

    cy.platform('tablet')
    cy.testVisual('stage-basic-tablet')

    cy.platform('mobile')
    cy.testVisual('stage-basic-mobile')
  })

  it('large stage', () => {
    cy.visit('/components/bal-stage/test/bal-stage.large.visual.html').waitForDesignSystem()

    cy.platform('desktop')
    cy.testVisual('stage-large')

    cy.platform('tablet')
    cy.testVisual('stage-large-tablet')

    cy.platform('mobile')
    cy.testVisual('stage-large-mobile')
  })
})
