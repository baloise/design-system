describe('bal-carousel', () => {
  describe('carousel', () => {
    beforeEach(() => cy.visit('/components/bal-carousel/test/bal-carousel.visual.html').waitForDesignSystem())

    it('basic component', () => {
      cy.platform('desktop')
      cy.getByTestId('basic').testVisual('carousel-basic-desktop')
      cy.getByTestId('image').testVisual('carousel-image-desktop')
      cy.getByTestId('product').testVisual('carousel-product-desktop')
      cy.getByTestId('card').testVisual('carousel-card-desktop')
      cy.getByTestId('card-with-value').testVisual('carousel-card-with-value-desktop')
      cy.getByTestId('responsive').testVisual('carousel-responsive-desktop')

      cy.platform('tablet')
      cy.getByTestId('basic').testVisual('carousel-basic-tablet')
      cy.getByTestId('image').testVisual('carousel-image-tablet')
      cy.getByTestId('product').testVisual('carousel-product-tablet')
      cy.getByTestId('card').testVisual('carousel-card-tablet')
      cy.getByTestId('card-with-value').testVisual('carousel-card-with-value-tablet')
      cy.getByTestId('responsive').testVisual('carousel-responsive-tablet')

      cy.platform('mobile')
      cy.getByTestId('basic').testVisual('carousel-basic-mobile')
      cy.getByTestId('image').testVisual('carousel-image-mobile')
      cy.getByTestId('product').testVisual('carousel-product-mobile')
      cy.getByTestId('card').testVisual('carousel-card-mobile')
      cy.getByTestId('card-with-value').testVisual('carousel-card-with-value-mobile')
      cy.getByTestId('responsive').testVisual('carousel-responsive-mobile')
    })
  })

  describe('product-slider', () => {
    it('combi with tabs', () => {
      cy.visit('/components/bal-carousel/test/bal-carousel-tabs.visual.html').platform('desktop').waitForDesignSystem()
      cy.getByTestId('tabs').select('Tab B')
      cy.testVisual('carousel-combi-tabs-desktop')
    })
  })
})
