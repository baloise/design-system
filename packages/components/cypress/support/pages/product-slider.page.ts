import { byTestId } from '../../../../testing/src'

export class ProductSliderPage {
  slider = byTestId('my-product-slider')

  open() {
    cy.page('/components/bal-product-slider')
  }
}
