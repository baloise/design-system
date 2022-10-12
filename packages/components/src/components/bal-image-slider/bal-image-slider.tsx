import { Component, h, ComponentInterface, Host, Element, State, Listen, Prop } from '@stencil/core'
import { stopEventBubbling } from '../../helpers/form-input.helpers'
import { BEM } from '../../utils/bem'
import { observeItems } from '../../utils/observer'
import { ResizeHandler } from '../../utils/resize'
import { SwipeHandler } from '../../utils/swipe'

@Component({
  tag: 'bal-image-slider',
})
export class ImageSlider implements ComponentInterface {
  @Element() el!: HTMLBalImageSliderElement

  private mutationO?: MutationObserver

  @State() slideIndex = 1
  @State() images!: HTMLBalImageSliderItemElement[]

  /**
   * value to set the images aspect ratio
   */
  @Prop() aspectRatio?: '1by1' | '3by2' | '4by3' | '16by9' = '16by9'

  private swipeHandler = SwipeHandler()
  private resizeWidthHandler = ResizeHandler()

  @Listen('touchmove', { target: 'window', passive: false })
  async blockVerticalScrolling(event: any) {
    if (this.el?.contains(event.target)) {
      stopEventBubbling(event)
    }
  }

  @Listen('resize', { target: 'window' })
  async resizeHandler() {
    this.resizeWidthHandler(() => {
      this.setSlide(this.slideIndex)
    })
  }

  connectedCallback() {
    this.mutationO = observeItems(this.el, 'bal-image-slider-item', () => this.updateImages())
    this.updateImages()
  }

  componentDidLoad(): void {
    this.swipeHandler.addEventListener(this.el)
    this.swipeHandler.onSwipeLeft(() => this.nextPage())
    this.swipeHandler.onSwipeRight(() => this.previousPage())
  }

  disconnectedCallback() {
    this.swipeHandler.removeEventListener()

    if (this.mutationO) {
      this.mutationO.disconnect()
      this.mutationO = undefined
    }
  }

  private nextPage() {
    this.setSlide(this.slideIndex + 1)
  }

  private previousPage() {
    if (this.slideIndex > 0) {
      this.setSlide(this.slideIndex - 1)
    }
  }

  private getChildItems() {
    return Array.from(this.el.querySelectorAll<HTMLBalImageSliderItemElement>('bal-image-slider-item'))
  }

  private getSliderContainer() {
    return this.el.querySelector<HTMLDivElement>('.bal-image-slider__container')
  }

  private getImageContainer() {
    return this.el.querySelector<HTMLDivElement>('.bal-image-slider__container__images')
  }

  private updateImages() {
    this.images = this.getChildItems()
  }

  /**
   * Set the slide to switch to
   * @param {number} slide :Set to switch to.
   */
  private setSlide = (slide: number) => {
    const container = this.getImageContainer()
    const slideWidth = this.images[0].clientWidth
    if (container && slide >= 0 && slide <= this.images.length) {
      this.slideIndex = slide
      container.style.transitionDuration = '1.2s'
      container.style.transitionTimingFunction = 'cubic-bezier(0.23, 0.93, 0.13, 1)'
      container.style.transform = `translate(-${(this.slideIndex - 1) * slideWidth}px)`
    }
  }

  render() {
    const block = BEM.block('image-slider')
    const container = block.element('container')
    const containerImages = container.element('images')

    return (
      <Host class={{ ...block.class() }}>
        <div
          class={{
            ...container.class(),
            ...container.modifier(`is-${this.aspectRatio}`).class(),
          }}
        >
          <div class={{ ...containerImages.class() }}>
            <slot></slot>
          </div>
        </div>
        <bal-pagination
          interface="small"
          totalPages={this.images.length}
          value={this.slideIndex}
          onBalChange={ev => {
            this.setSlide(ev.detail)
          }}
        />
      </Host>
    )
  }
}
