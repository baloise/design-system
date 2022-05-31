import { Component, h, ComponentInterface, Host, Element, State } from '@stencil/core'

@Component({
  tag: 'bal-image-slider',
  styleUrl: 'bal-image-slider.scss',
})
export class ImageSlider implements ComponentInterface {
  @Element() host!: HTMLBalImageSliderElement
  @State() slideIndex = 0
  @State() slideWidth = 288
  private images!: NodeListOf<HTMLImageElement>
  private imageContainer!: HTMLDivElement

  connectedCallback() {
    this.imageContainer = this.host.querySelector('[slot="images"]') as HTMLDivElement
    this.imageContainer.classList.add('bal-image-slider__image-container')
    this.images = this.imageContainer?.querySelectorAll(':scope > img') as NodeListOf<HTMLImageElement>

    for (let i = 0; i < this.images.length; i++) {
      this.images[i].classList.add('bal-image-slider__slider-item')
    }
  }

  private getSlideWidth = () => {
    const viewPort = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)

    if (viewPort <= 768) {
      this.slideWidth = 288
    } else if (viewPort > 768 && viewPort < 1408) {
      this.slideWidth = 670
    } else {
      this.slideWidth = 1400
    }
  }

  private setSlide = (slide: number) => {
    if (slide >= 0 && slide !== this.images.length) {
      this.slideIndex = slide
      this.imageContainer.style.transitionDuration = '1.2s'
      this.imageContainer.style.transitionTimingFunction = 'cubic-bezier(0.23, 0.93, 0.13, 1)'
      this.imageContainer.style.transform = `translate(-${this.slideIndex * this.slideWidth}px)`
    } else {
      return
    }
  }

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

  componentWillRender() {
    this.getSlideWidth()
  }

  render() {
    return (
      <Host class="bal-image-slider__container">
        <div class="bal-image-slider_viewport-container">
          <slot name="images"></slot>
        </div>
        <div class="bal-image-slider__controls is-flex is-justify-content-center is-align-items-center">
          {this.slideIndex > 0 ? (
            <bal-button
              class="mt-4"
              onClick={() => this.setSlide(this.slideIndex - 1)}
              color="link"
              size="small"
              icon="caret-left"
              flat={true}
            />
          ) : (
            <div class="bal-button-placeholder" />
          )}

          <div class="bal-image-slider__dot-container is-flex is-justify-content-center is-align-items-center">
            {this.getControls()}
          </div>
          {this.slideIndex < this.images.length - 1 ? (
            <bal-button
              class="mt-4"
              onClick={() => this.setSlide(this.slideIndex + 1)}
              color="link"
              size="small"
              icon="caret-right"
              flat={true}
            />
          ) : (
            <div class="bal-button-placeholder" />
          )}
        </div>
      </Host>
    )
  }
}
