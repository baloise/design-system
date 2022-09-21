import { Component, h, ComponentInterface, Host, Element, State, Listen } from '@stencil/core'
import { BEM } from '../../utils/bem'
import { observeItems } from '../../utils/observer'

@Component({
  tag: 'bal-tab-slider',
})
export class TabSlider implements ComponentInterface {
  @Element() el!: HTMLBalTabSliderElement

  private mutationO?: MutationObserver
  private xPosition = 0

  @State() slideIndex = 1
  @State() slides!: HTMLBalTabSliderItemElement[]

  @Listen('resize', { target: 'window' })
  async resizeHandler() {
    this.setSlide(this.slideIndex)
  }

  connectedCallback() {
    this.mutationO = observeItems(this.el, 'bal-tab-slider-item', () => this.updateSlides())
    this.updateSlides()
  }

  disconnectedCallback() {
    if (this.mutationO) {
      this.mutationO.disconnect()
      this.mutationO = undefined
    }
  }

  @Listen('touchstart')
  touchStart(event: TouchEvent) {
    const tabContainer = this.getSliderContainer()
    if (tabContainer?.contains(event.target as HTMLElement)) {
      this.xPosition = event.touches[0].pageX
    }
  }

  @Listen('touchend')
  touchEnd(event: TouchEvent) {
    const tabContainer = this.getSliderContainer()
    if (tabContainer?.contains(event.target as HTMLElement)) {
      if (event.changedTouches[0].pageX < this.xPosition) {
        this.setSlide(this.slideIndex + 1)
      } else {
        this.setSlide(this.slideIndex - 1)
      }
    }
  }

  private getChildItems() {
    return Array.from(this.el.querySelectorAll<HTMLBalTabSliderItemElement>('bal-tab-slider-item'))
  }

  private getSliderContainer() {
    return this.el.querySelector<HTMLDivElement>('.bal-tab-slider__container')
  }

  private getTabContainer() {
    return this.el.querySelector<HTMLDivElement>('.bal-tab-slider__container__slides')
  }

  private updateSlides() {
    this.slides = this.getChildItems()
  }

  /**
   * Set the slide to switch to
   * @param {number} slide :Set to switch to.
   */
  private setSlide = (slide: number) => {
    const container = this.getTabContainer()
    const slideWidth = this.slides[0].clientWidth
    if (container && slide >= 0 && slide <= this.slides.length) {
      this.slideIndex = slide
      container.style.transitionDuration = '1.2s'
      container.style.transitionTimingFunction = 'cubic-bezier(0.23, 0.93, 0.13, 1)'
      container.style.transform = `translate(-${(this.slideIndex - 1) * slideWidth}px)`
    }
  }

  render() {
    const block = BEM.block('tab-slider')
    const container = block.element('container')
    const containerSlides = container.element('slides')

    return (
      <Host class={{ ...block.class() }}>
        <bal-pagination
          interface="tabs"
          totalPages={this.slides.length}
          value={this.slideIndex}
          onBalChange={ev => {
            this.setSlide(ev.detail)
          }}
        />
        <div
          class={{
            ...container.class(),
          }}
        >
          <div class={{ ...containerSlides.class() }}>
            <slot></slot>
          </div>
        </div>
      </Host>
    )
  }
}
