import { Component, h, ComponentInterface, Host, Element, State, Listen } from '@stencil/core'
import { BEM } from '../../utils/bem'
import { observeHasClassActive, observeItems } from '../../utils/observer'
import { isPlatform } from '../../utils/platform'

@Component({
  tag: 'bal-product-slider',
})
export class ProductSlider implements ComponentInterface {
  @Element() el!: HTMLBalProductSliderElement

  private mutationO?: MutationObserver
  private mutationTabO?: MutationObserver
  private productWidth = 176

  @State() items!: HTMLBalProductSliderItemElement[]
  @State() slideIndex = 0
  @State() lastSlide = 0
  @State() sliderLength = 0

  @Listen('resize', { target: 'window' })
  async resizeHandler() {
    this.setSlide(0)
    this.calculateLastSlide()
  }

  connectedCallback() {
    this.mutationO = observeItems(this.el, 'bal-product-slider-item', () => this.updateItems())
    const parentTabItem = this.el.closest('bal-tab-item')
    if (parentTabItem) {
      this.mutationTabO = observeHasClassActive(parentTabItem, () => this.calculateLastSlide())
    }
    this.updateItems()
  }

  disconnectedCallback() {
    if (this.mutationO) {
      this.mutationO.disconnect()
      this.mutationO = undefined
    }
    if (this.mutationTabO) {
      this.mutationTabO.disconnect()
      this.mutationTabO = undefined
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

  private getParentWidth(element: any): number {
    const parentWidth = (element.parentNode as any).offsetWidth
    if (parentWidth === 0) {
      return this.getParentWidth(element.parentNode.parentNode)
    }
    return parentWidth
  }

  private getOffsetWidth() {
    const elementOffsetWidth = this.el.offsetWidth
    if (elementOffsetWidth === 0) {
      return this.getParentWidth(this.el.parentNode)
    }
    return elementOffsetWidth
  }

  private calculateLastSlide() {
    this.lastSlide = Math.ceil(this.sliderLength || this.items.length - this.getOffsetWidth() / this.productWidth)
  }

  render() {
    const block = BEM.block('product-slider')
    const container = block.element('container')
    const containerProducts = container.element('products')
    const controls = block.element('controls')
    const controlButton = controls.element('button')

    this.calculateLastSlide()

    const leftControlIsDisabled = this.slideIndex === 0
    const rightControlIsDisabled = this.slideIndex >= this.lastSlide
    const steps = isPlatform('mobile') ? 1 : 2

    return (
      <Host class={{ ...block.class() }}>
        <div class={{ ...container.class() }}>
          <div class={{ ...containerProducts.class() }}>
            <slot></slot>
          </div>
        </div>
        <div class={{ ...controls.class(), 'is-hidden': leftControlIsDisabled && rightControlIsDisabled }}>
          <div class={{ ...controlButton.class(), ...controlButton.modifier('left').class() }}>
            <bal-button
              disabled={leftControlIsDisabled}
              onClick={() => this.setSlide(this.slideIndex > 1 ? this.slideIndex - steps : 0)}
              color="primary"
              square
              rounded
              icon="caret-left"
            />
          </div>
          <div class={{ ...controlButton.class(), ...controlButton.modifier('right').class() }}>
            <bal-button
              disabled={rightControlIsDisabled}
              onClick={() => this.setSlide(this.slideIndex + steps)}
              color="primary"
              square
              rounded
              icon="caret-right"
            />
          </div>
        </div>
      </Host>
    )
  }
}
