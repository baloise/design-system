import { Component, h, ComponentInterface, Host, Element, State, Listen } from '@stencil/core'

@Component({
  tag: 'bal-product-slider',
  styleUrl: 'bal-product-slider.scss',
})
export class ProductSlider implements ComponentInterface {
  @Element() host!: HTMLBalProductSliderElement
  @State() slideIndex = 0
  @State() lastSlide = 0
  private images!: NodeListOf<HTMLImageElement>
  private productContainer!: HTMLDivElement

  connectedCallback() {
    this.productContainer = this.host.querySelector('[slot="images"]') as HTMLDivElement
    this.productContainer.classList.add('bal-product-slider__product-container')
    this.images = this.productContainer?.querySelectorAll(':scope > div') as NodeListOf<HTMLImageElement>
  }

  /**
   * Set the slide to switch to
   * @param {number} slide :Set to switch to.
   */
  private setSlide = (slide: number) => {
    if (slide >= 0 && slide <= this.lastSlide + 1) {
      this.slideIndex = slide > this.lastSlide ? this.lastSlide : slide
      this.productContainer.style.transitionDuration = '1.2s'
      this.productContainer.style.transitionTimingFunction = 'cubic-bezier(0.23, 0.93, 0.13, 1)'
      this.productContainer.style.transform = `translate(-${this.slideIndex * 180}px)`
    } else {
      return
    }
  }

  /**
   * Change tab event
   * @param {CustomEvent} event :onBalChange event fired
   */
  @Listen('balChange')
  onBalChange(event: CustomEvent<string>) {
    for (let i = 0; i <= this.images.length; i++) {
      if (this.images[i].dataset.category === event.detail) {
        this.setSlide(i <= this.lastSlide ? i : this.lastSlide)
        break
      }
    }
  }

  render() {
    this.lastSlide = Math.ceil(this.images.length - this.host.offsetWidth / 180)

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
        <div class="bal-product-slider__control-container-box">
          <div class="bal-product-slider__control-container left">
            <bal-button
              class={`bal-product-slider__control left custom-color ${this.slideIndex > 0 ? '' : 'inactive'}`}
              onClick={() => this.setSlide(this.slideIndex > 1 ? this.slideIndex - 2 : 0)}
              color="link"
              size="small"
              icon="caret-left"
              flat={true}
            />
          </div>
          <div class="bal-product-slider__control-container right">
            <bal-button
              class={`bal-product-slider__control right custom-color ${
                this.slideIndex < this.lastSlide ? '' : 'inactive'
              }`}
              onClick={() => this.setSlide(this.slideIndex + 2)}
              color="link"
              size="small"
              icon="caret-right"
              flat={true}
            />
          </div>
        </div>
      </Host>
    )
  }
}
