import {
  Component,
  h,
  ComponentInterface,
  Host,
  Element,
  Prop,
  Method,
  Event,
  EventEmitter,
  State,
} from '@stencil/core'
import { debounce } from '../../utils/helpers'
import { BEM } from '../../utils/bem'
import { MutationHandler } from '../../utils/observer'
import { ResizeObserverHandler } from '../../utils/resize'
import { SwipeHandler } from '../../utils/swipe'
import { BalSlide, ControlItem } from './bal-carousel.type'
import { Events } from '../../types'
import { TabControl } from './controls/tab-control'
import { DotControl } from './controls/dot-control'

@Component({
  tag: 'bal-carousel',
  styleUrl: 'bal-carousel.sass',
})
export class Carousel implements ComponentInterface {
  private resizeHandler = ResizeObserverHandler()
  private mutationHandler = MutationHandler()
  private swipeHandler = SwipeHandler()
  private containerEl?: HTMLDivElement
  private innerEl?: HTMLDivElement

  @State() isLastSlideVisible = false

  @Element() el!: HTMLElement

  @Prop() value = 0
  @Prop() steps = 1
  @Prop() itemsPerView: 'auto' | number = 1
  @Prop() controls: 'small' | 'large' | 'dots' | 'tabs' | 'none' = 'none'
  @Prop() aspectRatio?: '1by1' | '3by2' | '4by3' | '16by9' = '16by9'
  @Prop() interface: 'card' | 'image' | 'product' | '' = ''

  /**
   * If 'true, the pagination will be sticky to the top
   */
  @Prop() controlsSticky = false

  /**
   * Emitted when a option got selected.
   */
  @Event() balChange!: EventEmitter<Events.BalCarouselChangeDetail>

  /**
   * LIFECYCLE
   * ---------------------------
   */

  connectedCallback(): void {
    const debounceItemsChanged = debounce(this.itemsChanged.bind(this), 100)

    this.mutationHandler.connect(this.el, 'bal-carousel-item', debounceItemsChanged)
    this.resizeHandler.connect(this.el, debounceItemsChanged)
  }

  componentDidLoad(): void {
    this.swipeHandler.connect(this.el)
    this.swipeHandler.onSwipeLeft(this.next.bind(this))
    this.swipeHandler.onSwipeRight(this.previous.bind(this))
  }

  disconnectedCallback() {
    this.mutationHandler.disconnect()
    this.resizeHandler.disconnect()
    this.swipeHandler.disconnect()
  }

  /**
   * PUBLIC METHODS
   * ---------------------------
   */

  @Method()
  async previous(steps = this.steps): Promise<void> {
    console.log('previous')
    let previousValue = this.value - steps
    if (previousValue < 0) {
      previousValue = 0
    }

    const activeSlide = await this.getSlide(previousValue)

    if (activeSlide) {
      const didAnimate = await this.animate(activeSlide.transformActive, true)
      if (this.value > 0) {
        this.value = previousValue
        if (!didAnimate) {
          this.previous()
        } else {
          this.balChange.emit(this.value)
        }
      }
    }
  }

  @Method()
  async next(steps = this.steps): Promise<void> {
    console.log('next')
    const items = this.getAllItemElements()
    const length = items.length
    let nextValue = this.value + steps

    if (nextValue >= length) {
      nextValue = length - 1
    }

    const activeSlide = await this.getSlide(nextValue)

    if (activeSlide) {
      const didAnimate = await this.animate(activeSlide.transformActive, true)
      if (didAnimate) {
        this.value = nextValue
        this.balChange.emit(this.value)
      }
    }
  }

  /**
   * PRIVATE METHODS
   * ---------------------------
   */

  private async animate(amount = 0, animated = true): Promise<boolean> {
    if (this.containerEl && this.innerEl) {
      const lastSlide = await this.getSlide()

      if (lastSlide) {
        const containerWidth = this.innerEl.clientWidth || 0
        const itemsWith = lastSlide.transformNext || 0
        const noNeedForSlide = itemsWith <= containerWidth
        const maxAmount = itemsWith - containerWidth
        const isLastSlideVisible = maxAmount < amount

        const transformValue = noNeedForSlide ? 0 : isLastSlideVisible ? maxAmount : amount

        this.containerEl.style.transitionDuration = animated ? '0.6s' : '0'
        this.containerEl.style.transform = `translate3d(-${transformValue}px, 0px, 0px)`

        this.isLastSlideVisible = isLastSlideVisible
        if (isLastSlideVisible) {
          return Promise.resolve(false)
        }
      }
    }

    return Promise.resolve(true)
  }

  private async getSlide(slideIndex?: number): Promise<BalSlide | undefined> {
    const items = this.getAllItemElements()
    const index = slideIndex === undefined ? items.length - 1 : slideIndex

    if (items.length > index && index >= 0) {
      const data = await this.getAllItemData()
      const gapSize = this.interface === 'product' ? 16 : 0

      return {
        el: items[index],
        data: data[index],
        transformNext: items.filter((_, n) => n < index + 1).reduce((acc, item) => acc + item.clientWidth + gapSize, 0),
        transformActive: items.filter((_, n) => n < index).reduce((acc, item) => acc + item.clientWidth + gapSize, 0),
        isFirst: index === 0,
        isLast: index === items.length - 1,
        total: items.length,
        index,
      }
    }
    return undefined
  }

  private async itemsChanged() {
    console.log('itemsChanged')
    const activeSlide = await this.getSlide(this.value)

    if (activeSlide) {
      this.animate(activeSlide.transformActive, false)
    }
  }

  private async getAllItemData() {
    const queue = this.getAllItemElements().map(el => el.getData())
    return await Promise.all(queue)
  }

  private getAllItemElements() {
    return Array.from(this.el.querySelectorAll('bal-carousel-item'))
  }

  private getAllControlItems(): ControlItem[] {
    const items: HTMLBalCarouselItemElement[] = this.getAllItemElements()
    return items.map((item, index) => ({ value: index, label: item.label }))
  }

  private hasShadow(): boolean {
    return this.itemsPerView > 1 || this.itemsPerView === 'auto' || this.interface === 'card'
  }

  private hasShadowLeft(): boolean {
    return this.hasShadow() && (this.value !== 0 || this.interface === 'card')
  }

  private hasShadowRight(): boolean {
    return this.hasShadow() && (!this.isLastSlideVisible || this.interface === 'card')
  }

  /**
   * EVENT BINDING
   * ---------------------------
   */

  private onPreviousButtonClick = () => {
    this.previous()
  }

  private onNextButtonClick = () => {
    this.next()
  }

  private onControlChange = (selectedValue: number) => {
    if (selectedValue !== this.value) {
      const isForward = selectedValue > this.value
      if (isForward) {
        this.next(selectedValue - this.value)
      } else {
        this.previous(this.value - selectedValue)
      }
    }
  }

  /**
   * RENDER
   * ---------------------------
   */

  render() {
    console.log('render')
    const block = BEM.block('carousel')
    const inner = block.element('inner')
    const container = inner.element('container')
    const controls = block.element('controls')

    const controlItems = this.getAllControlItems()

    return (
      <Host
        class={{
          ...block.class(),
          ...block.modifier(this.interface).class(this.interface !== ''),
          ...block.modifier('controls-sticky').class(this.controlsSticky),
          ...block.modifier(`controls-${this.controls}`).class(),
        }}
      >
        {this.controls === 'tabs' ? (
          <TabControl
            value={this.value}
            items={controlItems}
            onControlChange={item => this.onControlChange(item.value)}
          ></TabControl>
        ) : (
          ''
        )}
        <div
          class={{
            ...inner.class(),
            ...inner.modifier(`items-per-view-${this.itemsPerView}`).class(),
            ...inner.modifier(`is-${this.aspectRatio}`).class(),
            ...inner.modifier(`shadow-left`).class(this.hasShadowLeft()),
            ...inner.modifier(`shadow-right`).class(this.hasShadowRight()),
          }}
          ref={el => (this.innerEl = el)}
        >
          <div
            class={{
              ...container.class(),
              ...container.modifier(`is-${this.aspectRatio}`).class(),
            }}
            ref={el => (this.containerEl = el)}
          >
            <slot></slot>
          </div>
        </div>

        {this.controls === 'dots' ? (
          <DotControl
            value={this.value}
            items={controlItems}
            onControlChange={item => this.onControlChange(item.value)}
          ></DotControl>
        ) : (
          ''
        )}

        <div class={{ ...controls.class() }}>
          <bal-button-group>
            <bal-button onClick={this.onPreviousButtonClick}>Previous</bal-button>
            <bal-button onClick={this.onNextButtonClick}>Next</bal-button>
          </bal-button-group>
        </div>
        {this.value}
      </Host>
    )
  }
}
