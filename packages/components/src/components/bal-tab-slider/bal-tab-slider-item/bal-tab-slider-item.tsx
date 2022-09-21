import { Component, ComponentInterface, h, Host } from '@stencil/core'

@Component({
  tag: 'bal-tab-slider-item',
})
export class TabSliderItem implements ComponentInterface {
  private inputId = `bal-tab-slider-item-${tabSliderItemId++}`

  render() {
    return (
      <Host aria-id={this.inputId} class="bal-tab-slider-item">
        <slot></slot>
      </Host>
    )
  }
}

let tabSliderItemId = 0
