import { Component, ComponentInterface, h, Host, Method, Prop } from '@stencil/core'

@Component({
  tag: 'bal-slider-item',
})
export class TabSliderItem implements ComponentInterface {
  /**
   * Label of the slide which will be used pagination tabs
   */
  @Prop() label = ''
  private inputId = `bal-slider-item-${sliderItemId++}`

  @Method() async getLabel(): Promise<string> {
    return this.label
  }

  render() {
    return (
      <Host aria-id={this.inputId} class="bal-slider-item">
        <slot></slot>
      </Host>
    )
  }
}

let sliderItemId = 0
