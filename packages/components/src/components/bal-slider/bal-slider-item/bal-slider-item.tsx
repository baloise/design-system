import { Component, ComponentInterface, h, Host, Prop } from '@stencil/core'

@Component({
  tag: 'bal-slider-item',
})
export class TabSliderItem implements ComponentInterface {
  /**
   * Label of the slide which will be used for pagination tabs
   */
  @Prop() label = ''
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
