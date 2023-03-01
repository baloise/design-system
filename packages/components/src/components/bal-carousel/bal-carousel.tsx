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
  Listen,
} from '@stencil/core'
import { debounce } from '../../utils/helpers'
import { BEM } from '../../utils/bem'
import { MutationHandler } from '../../utils/observer'
import { ResizeHandler, ResizeObserverHandler } from '../../utils/resize'
import { SwipeHandler } from '../../utils/swipe'
import { BalSlide, ControlItem } from './bal-carousel.type'
import { TabControl } from './controls/tab-control'
import { DotControl } from './controls/dot-control'
import { LargeControl } from './controls/large-control'
import { SmallControl } from './controls/small-control'
import { stopEventBubbling } from '../../utils/form-input'
import { isPlatform } from '../../utils/platform'

@Component({
  tag: 'bal-carousel',
  styleUrl: 'bal-carousel.sass',
})
export class Carousel implements ComponentInterface {
  private resizeHandler = ResizeObserverHandler()
  private resizeWidthHandler = ResizeHandler()
  private mutationHandler = MutationHandler()
  private swipeHandler = SwipeHandler()
  private containerEl?: HTMLDivElement
  private innerEl?: HTMLDivElement
  private previousTransformValue = 0

  @State() isLastSlideVisible = false
  @State() areControlsHidden = !isPlatform('mobile')

  @Element() el!: HTMLElement

  /**
   * PUBLIC PROPERTY API
   * ------------------------------------------------------
   */

  /**
   * Defines the active slide index.
   */
  @Prop() value = 0

  /**
   * When how many slides are moved when going forward or backward.
   */
  @Prop() steps = 1

  /**
   * Defines how many slides are visible in the container for the user.
   * `auto` will use the size of the actual item content
   */
  @Prop() itemsPerView: 'auto' | number = 1

  /**
   * Defines the layout of the navigation controls.
   */
  @Prop() controls: 'small' | 'large' | 'dots' | 'tabs' | 'none' = 'none'

  /**
   * Defines the image aspect ratio.
   * Should be combined with the interface `product`
   */
  @Prop() aspectRatio?: '1by1' | '3by2' | '4by3' | '16by9' = '16by9'

  /**
   * Defines special looks.
   */
  @Prop() interface: 'card' | 'image' | 'product' | '' = ''

  /**
   * If `true` the controls will be sticky to the top.
   */
  @Prop() controlsSticky = false

  /**
   * If `true` vertical scrolling on mobile is enabled.
   */
  @Prop() scrollY = true

  /**
   * Emitted when a option got selected.
   */
  @Event() balChange!: EventEmitter<BalEvents.BalCarouselChangeDetail>

  /**
   * LIFECYCLE
   * ------------------------------------------------------
   */

  connectedCallback(): void {
    const debounceItemsChanged = debounce(this.itemsChanged.bind(this), 100)

    this.swipeHandler.connect(this.el)
    this.mutationHandler.connect(this.el, 'bal-carousel-item', debounceItemsChanged)
    this.resizeHandler.connect(this.el, debounceItemsChanged)

    this.swipeHandler.onSwipeLeft(this.next.bind(this))
    this.swipeHandler.onSwipeRight(this.previous.bind(this))
  }

  disconnectedCallback() {
    this.mutationHandler.disconnect()
    this.resizeHandler.disconnect()
    this.swipeHandler.disconnect()
  }

  /**
   * LISTENERS
   * ------------------------------------------------------
   */

  @Listen('touchmove', { target: 'window', passive: false })
  async blockVerticalScrolling(event: any) {
    if (!this.scrollY && this.el?.contains(event.target)) {
      stopEventBubbling(event)
    }
  }

  @Listen('resize', { target: 'window' })
  async resizeListener() {
    this.resizeWidthHandler(() => {
      this.areControlsHidden = !isPlatform('mobile')
    })
  }

  /**
   * PUBLIC METHODS
   * ------------------------------------------------------
   */

  @Method()
  async previous(steps = this.steps): Promise<void> {
    let previousValue = this.value - steps
    if (previousValue < 0) {
      previousValue = 0
    }

    const activeSlide = await this.buildSlide(previousValue)

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
    const items = this.getAllItemElements()
    const length = items.length
    let nextValue = this.value + steps

    if (nextValue >= length) {
      nextValue = length - 1
    }

    const activeSlide = await this.buildSlide(nextValue)

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
   * ------------------------------------------------------
   */

  private async animate(amount = 0, animated = true): Promise<boolean> {
    if (this.containerEl && this.innerEl) {
      const lastSlide = await this.buildSlide()

      if (lastSlide) {
        const containerWidth = this.innerEl.clientWidth || 0
        const itemsWith = lastSlide.transformNext || 0
        const noNeedForSlide = itemsWith <= containerWidth
        const maxAmount = itemsWith - containerWidth
        const isLastSlideVisible = maxAmount < amount
        const isFirst = amount === 0
        const hasSmallControls = this.controls === 'small'
        const hasLargeControls = this.controls === 'large'

        let transformValue = noNeedForSlide ? 0 : isLastSlideVisible ? maxAmount : amount

        if (!isFirst && !noNeedForSlide && (hasSmallControls || hasLargeControls)) {
          transformValue = transformValue - (isLastSlideVisible ? 0 : hasLargeControls ? 56 : 48)
        }

        this.containerEl.style.transitionDuration = animated ? '0.6s' : '0'
        this.containerEl.style.transform = `translate3d(-${transformValue}px, 0px, 0px)`

        const didAnimate = transformValue !== this.previousTransformValue
        this.previousTransformValue = transformValue
        this.isLastSlideVisible = isLastSlideVisible

        if (!didAnimate) {
          return Promise.resolve(false)
        }
      }
    }

    return Promise.resolve(true)
  }

  private async buildSlide(slideIndex?: number): Promise<BalSlide | undefined> {
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
    const activeSlide = await this.buildSlide(this.value)

    if (activeSlide) {
      this.animate(activeSlide.transformActive, false)
    }
  }

  /**
   * GETTERS
   * ------------------------------------------------------
   */

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

  private isFirst(): boolean {
    return this.value === 0
  }

  private isLast(): boolean {
    return this.isLastSlideVisible
  }

  /**
   * EVENT BINDING
   * ------------------------------------------------------
   */

  private onPreviousButtonClick = () => this.previous()

  private onNextButtonClick = () => this.next()

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
   * ------------------------------------------------------
   */

  render() {
    const block = BEM.block('carousel')
    const inner = block.element('inner')
    const container = inner.element('container')

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

        {this.controls === 'large' ? (
          <LargeControl
            isFirst={this.isFirst()}
            isLast={this.isLast()}
            areControlsHidden={this.areControlsHidden}
            onNextClick={() => this.onNextButtonClick()}
            onPreviousClick={() => this.onPreviousButtonClick()}
          ></LargeControl>
        ) : (
          ''
        )}

        {this.controls === 'small' ? (
          <SmallControl
            isFirst={this.isFirst()}
            isLast={this.isLast()}
            onNextClick={() => this.onNextButtonClick()}
            onPreviousClick={() => this.onPreviousButtonClick()}
          ></SmallControl>
        ) : (
          ''
        )}
      </Host>
    )
  }
}
