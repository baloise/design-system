import { dataTestSelector } from '../../../src'

export class SliderPage {
  slider = dataTestSelector('slider')
  sliderDisabled = dataTestSelector('slider-disabled')

  open() {
    cy.visit('/components/form/bal-slider')
  }
}
