import { byTestId } from '../../../testing/src'

describe('ProductSlider', () => {
  const basic = byTestId('product-slider')

  before(() => cy.visitPage('/components/bal-product-slider/test/bal-product-slider.cy.html'))

  it('should have content', () => {
    cy.get(basic).contains('Hello World')
  })
})
