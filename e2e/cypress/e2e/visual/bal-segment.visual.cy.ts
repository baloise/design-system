describe('bal-segment', () => {
  beforeEach(() => cy.visit('/components/bal-segment/test/bal-segment.visual.html').waitForDesignSystem())

  context('mobile', () => {
    beforeEach(() => cy.platform('mobile'))

    it('basic component', () => {
      cy.getByTestId('basic').testVisual('icon-mobile')
    })

    it('component horizontal', () => {
      cy.getByTestId('horizontal').testVisual('horizontal-mobile')
    })

    it('component vertical', () => {
      cy.getByTestId('vertical').testVisual('vertical-mobile')
    })
  })

  context('desktop', () => {
    beforeEach(() => cy.platform('desktop'))

    it('basic component', () => {
      cy.getByTestId('basic').testVisual('icon-desktop')
    })

    it('component horizontal', () => {
      cy.getByTestId('horizontal').testVisual('horizontal-desktop')
    })

    it('component vertical', () => {
      cy.getByTestId('vertical').testVisual('vertical-desktop')
    })
  })
})
