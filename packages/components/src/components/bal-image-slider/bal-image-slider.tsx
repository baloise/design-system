import { Component, h, ComponentInterface, Host, Element, State } from '@stencil/core'

@Component({
  tag: 'bal-image-slider',
  styleUrl: 'bal-image-slider.scss',
})
export class ImageSlider implements ComponentInterface {
  @Element() host!: HTMLBalImageSliderElement
  @State() slideIndex = 0
  private images!: NodeListOf<HTMLDivElement>
  private imageContainer!: HTMLDivElement

  connectedCallback() {
    this.imageContainer = this.host.querySelector('[slot="images"]') as HTMLDivElement
    this.imageContainer.classList.add('bal-image-slider__image-container')
    this.images = this.imageContainer?.querySelectorAll('div.bal-image-slider__item') as NodeListOf<HTMLDivElement>
  }

  /**
   * Set the slide to switch to
   * @param {number} slide :Set to switch to.
   */
  private setSlide = (slide: number) => {
    const slideWidth = this.images[0].clientWidth
    if (slide >= 0 && slide !== this.images.length) {
      this.slideIndex = slide
      this.imageContainer.style.transitionDuration = '1.2s'
      this.imageContainer.style.transitionTimingFunction = 'cubic-bezier(0.23, 0.93, 0.13, 1)'
      this.imageContainer.style.transform = `translate(-${this.slideIndex * slideWidth}px)`
    } else {
      return
    }
  }

  /**
   * Returns the controls for the slider based on the total number of the slides
   * > 5 = number control
   * < 5 = dots control
   */
  private getControls = () => {
    if (this.images.length <= 5) {
      const dots = []
      for (let i = 1; i <= this.images.length; i++) {
        dots.push(
          <span
            class={`bal-image-slider__dot ${this.slideIndex + 1 === i ? 'active' : 'inactive'}`}
            onClick={() => this.setSlide(i - 1)}
          ></span>,
        )
      }
      return dots.map(dot => dot)
    } else {
      return (
        <bal-text space="none" class="is-size-5" color="blue">
          {this.slideIndex + 1 + '/' + this.images.length}
        </bal-text>
      )
    }
  }

  render() {
    return (
      <Host class="bal-image-slider__container">
        <div class="bal-image-slider_viewport-container">
          <slot name="images"></slot>
        </div>
        <div class="bal-image-slider__controls is-flex is-justify-content-center is-align-items-center">
          {
            <bal-button
              class="mt-4"
              onClick={() => this.setSlide(this.slideIndex - 1)}
              color="link"
              size="small"
              icon="caret-left"
              flat={true}
            />
          }

          <div class="bal-image-slider__dot-container is-flex is-justify-content-center is-align-items-center">
            {this.getControls()}
          </div>
          {
            <bal-button
              class="mt-4"
              onClick={() => this.setSlide(this.slideIndex + 1)}
              color="link"
              size="small"
              icon="caret-right"
              flat={true}
            />
          }
        </div>
      </Host>
    )
  }
}
