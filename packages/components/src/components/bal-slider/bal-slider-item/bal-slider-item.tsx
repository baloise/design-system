import { Component, ComponentInterface, h, Host } from '@stencil/core'

@Component({
  tag: 'bal-slider-item',
})
export class TabSliderItem implements ComponentInterface {
  private inputId = `bal-slider-item-${sliderItemId++}`

  render() {
    return (
      <Host aria-id={this.inputId} class="bal-slider-item">
        <slot></slot>
      </Host>
    )
  }
}

let sliderItemId = 0
