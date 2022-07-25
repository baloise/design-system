import { Component, ComponentInterface, h, Host, Prop } from '@stencil/core'

@Component({
  tag: 'bal-product-slider-item',
})
export class ProductSliderItem implements ComponentInterface {
  private inputId = `bal-product-slider-item-${productSliderItemId++}`

  /**
   * Src path to the image
   */
  @Prop() src?: string

  /**
   * Label or title of the product
   */
  @Prop() label?: string

  render() {
    return (
      <Host aria-id={this.inputId} class="bal-product-slider-item bal-product-slider__product-item">
        {this.src !== undefined ? <img class="bal-product-slider__product-image" src={this.src} /> : ''}
        {this.label !== undefined ? (
          <bal-text class="p-2" bold={true}>
            {this.label}
          </bal-text>
        ) : (
          ''
        )}
        <slot></slot>
      </Host>
    )
  }
}

let productSliderItemId = 0
