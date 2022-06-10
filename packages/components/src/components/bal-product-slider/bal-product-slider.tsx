import { Component, h, ComponentInterface, Host, Element, State, Listen } from '@stencil/core'

@Component({
  tag: 'bal-product-slider',
  styleUrl: 'bal-product-slider.scss',
})
export class ProductSlider implements ComponentInterface {
  @Element() host!: HTMLBalProductSliderElement
  @State() slideIndex = 0
  private images!: NodeListOf<HTMLImageElement>
  private productContainer!: HTMLDivElement

  connectedCallback() {
    this.productContainer = this.host.querySelector('[slot="images"]') as HTMLDivElement
    this.productContainer.classList.add('bal-product-slider__product-container')
    this.images = this.productContainer?.querySelectorAll(':scope > img') as NodeListOf<HTMLImageElement>
  }

  /**
   * Set the slide to switch to
   * @param {number} slide :Set to switch to.
   */
  private setSlide = (slide: number) => {
    // const slideWidth = 190
    console.log('this.slideIndex :>> ', this.slideIndex)
    console.log('slide :>> ', slide)
    if (slide >= 0 && slide !== this.images.length) {
      this.slideIndex = slide
      this.productContainer.style.transitionDuration = '1.2s'
      this.productContainer.style.transitionTimingFunction = 'cubic-bezier(0.23, 0.93, 0.13, 1)'
      this.productContainer.style.transform = `translate(-${this.slideIndex * 180}px)`
    } else {
      return
    }
  }

  @Listen('balChange')
  onBalChange(event: CustomEvent<string>) {
    console.log('event :>> ', event)
  }

  render() {
    return (
      <Host>
        <div>
          <slot name="tabs"></slot>
        </div>
        <div class="bal-product-slider__container">
          <div class="bal-product-slider_viewport-container">
            <slot name="images"></slot>
          </div>
        </div>
        <bal-button
          class={`bal-product-slider__control left custom-color ${this.slideIndex > 0 ? '' : 'inactive'}`}
          onClick={() => this.setSlide(this.slideIndex - 2)}
          color="link"
          size="small"
          icon="caret-left"
          flat={true}
        />
        <bal-button
          class={`bal-product-slider__control right custom-color ${
            this.slideIndex < this.images.length ? '' : 'inactive'
          }`}
          onClick={() => this.setSlide(this.slideIndex + 2)}
          color="link"
          size="small"
          icon="caret-right"
          flat={true}
        />
      </Host>
    )
  }
}
