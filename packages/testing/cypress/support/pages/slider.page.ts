import { dataTestSelector } from '../../../src/selectors'

export class SliderPage {
  slider = dataTestSelector('slider')
  sliderDisabled = dataTestSelector('slider-disabled')

  open() {
    cy.visit('/components/bal-slider')
  }
}
