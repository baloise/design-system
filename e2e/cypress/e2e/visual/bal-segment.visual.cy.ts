describe('bal-segment', () => {
  beforeEach(() => cy.visit('/components/bal-segment/test/bal-segment.visual.html').waitForDesignSystem())

  it('basic component', () => {
    cy.platform('desktop')
    cy.getByTestId('basic').testVisual('icon-desktop')

    cy.platform('mobile')
    cy.getByTestId('basic').testVisual('icon-mobile')
  })

  it('component horizontal', () => {
    cy.platform('desktop')
    cy.getByTestId('horizontal').testVisual('horizontal-desktop')

    cy.platform('mobile')
    cy.getByTestId('horizontal').testVisual('horizontal-mobile')
  })

  it('component vertical', () => {
    cy.platform('desktop')
    cy.getByTestId('vertical').testVisual('vertical-desktop')

    cy.platform('mobile')
    cy.getByTestId('vertical').testVisual('vertical-mobile')
  })
})
