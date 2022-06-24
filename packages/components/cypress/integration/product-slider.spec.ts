import { app } from '../support/app'

describe('ProductSlider', () => {
  const page = app.getProductSliderPage()

  it('should have text', () => {
    page.open()
    cy.get(page.slider).contains('Product 1')
    cy.get(page.slider).contains('Product 3')
  })

  it('should not have scrolled', () => {
    page.open()
    cy.get('.bal-product-slider__product-container').should(
      'not.have.attr',
      'style',
      'transition-duration: 1.2s; transition-timing-function: cubic-bezier(0.23, 0.93, 0.13, 1); transform: translate(-360px);',
    )
  })

  it('should have scrolled', () => {
    page.open()
    cy.get('.bal-product-slider__control-container .right').click()
    cy.get('.bal-product-slider__product-container').should(
      'have.attr',
      'style',
      'transition-duration: 1.2s; transition-timing-function: cubic-bezier(0.23, 0.93, 0.13, 1); transform: translate(-360px);',
    )
  })
})
