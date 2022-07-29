import { Component, ComponentInterface, h, Host, Prop } from '@stencil/core'

@Component({
  tag: 'bal-image-slider-item',
})
export class ImageSliderItem implements ComponentInterface {
  private inputId = `bal-image-slider-item-${imageSliderItemId++}`

  /**
   * Src path to the image
   */
  @Prop() src?: string

  render() {
    return (
      <Host aria-id={this.inputId} class="bal-image-slider-item">
        {this.src !== undefined ? <img src={this.src} /> : ''}
        <slot></slot>
      </Host>
    )
  }
}

let imageSliderItemId = 0
