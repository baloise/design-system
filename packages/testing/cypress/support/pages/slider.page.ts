import { byTestId } from '../../../src'

export class SliderPage {
  slider = byTestId('slider')
  sliderDisabled = byTestId('slider-disabled')

  open() {
    cy.visit('/components/form/bal-slider')
  }
}
