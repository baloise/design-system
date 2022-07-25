import { Component, h, ComponentInterface, Host, Element, State } from '@stencil/core'
import { BEM } from '../../utils/bem'
import { observeItems } from '../../utils/observer'

/**
 * TODOs
 * [] Scss to Sass
 * [] remove slots
 * [] get tabs outside
 * [] create custom item component
 */
@Component({
  tag: 'bal-product-slider',
})
export class ProductSlider implements ComponentInterface {
  @Element() el!: HTMLBalProductSliderElement

  private mutationO?: MutationObserver
  private productWidth = 180

  @State() items!: HTMLBalProductSliderItemElement[]
  @State() slideIndex = 0
  @State() lastSlide = 0
  @State() sliderLength = 0

  connectedCallback() {
    this.mutationO = observeItems(this.el, 'bal-product-slider-item', () => this.updateItems())
    this.updateItems()
  }

  disconnectedCallback() {
    if (this.mutationO) {
      this.mutationO.disconnect()
      this.mutationO = undefined
    }
  }

  private getChildItems() {
    return Array.from(this.el.querySelectorAll<HTMLBalProductSliderItemElement>('bal-product-slider-item'))
  }

  private getProductContainer() {
    return this.el.querySelector<HTMLDivElement>('.bal-product-slider__container__products')
  }

  private updateItems() {
    this.items = this.getChildItems()
  }

  /**
   * Set the slide to switch to
   * @param {number} slide :Set to switch to.
   */
  private setSlide = (slide: number) => {
    const productContainer = this.getProductContainer()
    if (productContainer && slide >= 0 && slide <= this.lastSlide + 1) {
      this.slideIndex = slide > this.lastSlide ? this.lastSlide : slide
      productContainer.style.transitionDuration = '1.2s'
      productContainer.style.transitionTimingFunction = 'cubic-bezier(0.23, 0.93, 0.13, 1)'
      productContainer.style.transform = `translate(-${this.slideIndex * this.productWidth}px)`
    }
  }

  render() {
    const block = BEM.block('product-slider')
    const container = block.element('container')
    const containerProducts = container.element('products')
    const controls = block.element('controls')
    const controlButton = controls.element('button')

    this.lastSlide = Math.ceil(this.sliderLength || this.items.length - this.el.offsetWidth / this.productWidth)

    return (
      <Host class={{ ...block.class() }}>
        <div class={{ ...container.class() }}>
          <div class={{ ...containerProducts.class() }}>
            <slot></slot>
          </div>
        </div>
        <div class={{ ...controls.class() }}>
          <bal-button
            class={{ ...controlButton.class(), ...controlButton.modifier('left').class() }}
            disabled={this.slideIndex === 0}
            onClick={() => this.setSlide(this.slideIndex > 1 ? this.slideIndex - 2 : 0)}
            color="primary"
            square
            rounded
            icon="caret-left"
          />
          <bal-button
            class={{ ...controlButton.class(), ...controlButton.modifier('right').class() }}
            disabled={this.slideIndex >= this.lastSlide}
            onClick={() => this.setSlide(this.slideIndex + 2)}
            color="primary"
            square
            rounded
            icon="caret-right"
          />
        </div>
      </Host>
    )
  }
}
