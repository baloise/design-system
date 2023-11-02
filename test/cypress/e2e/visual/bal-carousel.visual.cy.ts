describe('bal-carousel', () => {
  beforeEach(() => cy.visit('/components/bal-carousel/test/bal-carousel.visual.html').waitForDesignSystem())

  it('basic component', () => {
    cy.platform('desktop')
    cy.getByTestId('basic').compareSnapshot('carousel-basic-desktop')
    cy.getByTestId('image').compareSnapshot('carousel-image-desktop')
    cy.getByTestId('product').compareSnapshot('carousel-product-desktop')
    cy.getByTestId('card').compareSnapshot('carousel-card-desktop')
    cy.getByTestId('responsive').compareSnapshot('carousel-responsive-desktop')

    cy.platform('tablet')
    cy.getByTestId('basic').compareSnapshot('carousel-basic-tablet')
    cy.getByTestId('image').compareSnapshot('carousel-image-tablet')
    cy.getByTestId('product').compareSnapshot('carousel-product-tablet')
    cy.getByTestId('card').compareSnapshot('carousel-card-tablet')
    cy.getByTestId('responsive').compareSnapshot('carousel-responsive-tablet')

    cy.platform('mobile')
    cy.getByTestId('basic').compareSnapshot('carousel-basic-mobile')
    cy.getByTestId('image').compareSnapshot('carousel-image-mobile')
    cy.getByTestId('product').compareSnapshot('carousel-product-mobile')
    cy.getByTestId('card').compareSnapshot('carousel-card-mobile')
    cy.getByTestId('responsive').compareSnapshot('carousel-responsive-mobile')
  })
})
