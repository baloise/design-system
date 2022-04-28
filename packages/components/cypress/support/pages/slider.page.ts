import { byTestId } from '../../../../testing/src'

export class SliderPage {
  slider = byTestId('slider')
  sliderDisabled = byTestId('slider-disabled')

  open() {
    cy.page('/components/form/bal-slider')
  }
}
