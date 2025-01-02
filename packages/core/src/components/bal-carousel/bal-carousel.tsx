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
  Watch,
} from '@stencil/core'
import { rLCP } from '../../utils/helpers'
import { BEM } from '../../utils/bem'
import { TabControl } from './controls/tab-control'
import { stopEventBubbling } from '../../utils/form-input'
import { BalBreakpointObserver, BalBreakpoints, balBreakpoints } from '../../utils/breakpoints'
import { ListenToBreakpoints } from '../../utils/breakpoints/breakpoints.decorator'
import { BalSwipeInfo, BalSwipeObserver, ListenToSwipe } from '../../utils/swipe'
import { BalMutationObserver, ListenToMutation } from '../../utils/mutation'
import { BalResizeObserver, ListenToResize } from '../../utils/resize'
import { BalConfigState } from '../../interfaces'
import { BalLanguage, ListenToConfig, defaultConfig } from '../../utils/config'
import { ListenTo } from '../../utils/listen'
import { SwiperChildItem, SwiperInterface, SwiperUtil } from '../../utils/swiper'

@Component({
  tag: 'bal-carousel',
  styleUrl: 'bal-carousel.sass',
})
export class Carousel
  implements
    ComponentInterface,
    BalBreakpointObserver,
    BalSwipeObserver,
    BalMutationObserver,
    BalResizeObserver,
    SwiperInterface
{
  swiper = new SwiperUtil()

  swiperIsLastSlideVisible = false

  @State() isLargestContentfulPaintDone = false
  @State() hasAnimated = false
  @State() isMobile = balBreakpoints.isMobile
  @State() language: BalLanguage = defaultConfig.language

  @Element() el!: HTMLElement

  /**
   * PUBLIC PROPERTY API
   * ------------------------------------------------------
   */

  /**
   * Defines the active slide index.
   */
  @Prop({ mutable: true }) value = 0

  @Watch('value')
  onValueChange() {
    this.swiper.index = this.value
  }

  /**
   * When how many slides are moved when going forward or backward.
   */
  @Prop() steps = 1

  @Watch('steps')
  onStepsChange() {
    this.swiper.steps = this.steps
  }

  /**
   * Defines how many slides are visible in the container for the user.
   * `auto` will use the size of the actual item content
   */
  @Prop() itemsPerView: 'auto' | 1 | 2 | 3 | 4 = 1

  @Watch('itemsPerView')
  onItemsPerViewChange() {
    this.swiper.itemsPerView = this.itemsPerView
  }

  /**
   * Defines the layout of the navigation controls.
   */
  @Prop() controls: 'small' | 'large' | 'dots' | 'tabs' | 'none' = 'none'

  @Watch('controls')
  onControlsChange() {
    this.swiper.controls = this.controls
  }

  /**
   * @deprecated
   * Defines the role of the carousel.
   */
  @Prop() htmlRole: 'tablist' | 'list' | '' = 'list'

  /**
   * If `true` items move under the controls, instead of having a gap
   */
  @Prop() controlsOverflow = false

  /**
   * If `true` the carousel can be used on dark background
   */
  @Prop() inverted = false

  /**
   * If `true` the carousel uses the full height
   */
  @Prop() fullHeight = false

  /**
   * Defines the image aspect ratio.
   * Should be combined with the interface `product`
   */
  @Prop() aspectRatio?: '1by1' | '3by2' | '4by3' | '16by9' = '16by9'

  /**
   * Defines special looks.
   */
  @Prop() interface: 'card' | 'image' | 'product' | '' = ''

  @Watch('interface')
  onInterFaceChange() {
    this.swiper.gapSize = this.interface === 'product' ? 16 : 0
  }

  /**
   * If `true` the controls will be sticky to the top.
   */
  @Prop() controlsSticky = false

  /**
   * If `true` vertical scrolling on mobile is enabled.
   */
  @Prop() scrollY = true

  /**
   * If `true` a light border is shown at the bottom.
   */
  @Prop() border = false

  /**
   * Emitted when a option got selected.
   */
  @Event() balChange!: EventEmitter<BalEvents.BalCarouselChangeDetail>

  /**
   * LIFECYCLE
   * ------------------------------------------------------
   */

  connectedCallback(): void {
    this.swiper.connectedCallback(this)
    this.onControlsChange()
    this.onInterFaceChange()
    this.onItemsPerViewChange()
    this.onStepsChange()
    this.onValueChange()
  }

  disconnectedCallback(): void {
    this.swiper.disconnectedCallback()
  }

  componentDidLoad(): void {
    rLCP(() => {
      this.isLargestContentfulPaintDone = true
    })
  }

  /**
   * LISTENERS
   * ------------------------------------------------------
   */

  @ListenTo('touchmove', { target: 'window', passive: false })
  async blockVerticalScrolling(ev: any) {
    if (!this.scrollY && this.el?.contains(ev.target)) {
      stopEventBubbling(ev)
    }
  }

  mutationObserverActive = true

  @ListenToMutation({ tags: ['bal-carousel-item'], characterData: false })
  mutationListener() {
    this.swiper.notifyChange()
  }

  @ListenToSwipe()
  swipeListener({ left, right }: BalSwipeInfo) {
    if (left) {
      this.next()
    } else if (right) {
      this.previous()
    }
  }

  @ListenToBreakpoints()
  breakpointListener(breakpoints: BalBreakpoints): void {
    this.isMobile = breakpoints.mobile
    this.swiper.notifyChange()
  }

  @ListenToResize()
  resizeListener(): void {
    this.swiper.notifyChange()
  }

  /**
   * @internal define config for the component
   */
  @Method()
  @ListenToConfig()
  async configChanged(state: BalConfigState): Promise<void> {
    this.language = state.language
  }

  /**
   * PUBLIC METHODS
   * ------------------------------------------------------
   */

  @Method()
  async previous(steps = this.steps): Promise<void> {
    this.swiper.previous(steps)
  }

  @Method()
  async next(steps = this.steps): Promise<void> {
    this.swiper.next(steps)
  }

  /**
   * @internal
   */
  @Method()
  async getContainerId(): Promise<string> {
    return this.swiper.containerId
  }

  /**
   * GETTERS
   * ------------------------------------------------------
   */

  swiperGetAllChildrenElements(): SwiperChildItem[] {
    return Array.from(this.el.querySelectorAll('bal-carousel-item'))
  }

  /**
   * EVENT HANDLERS
   * ------------------------------------------------------
   */

  swiperOnChange(index: number): void {
    this.value = index
    this.balChange.emit(index)
  }

  /**
   * RENDER
   * ------------------------------------------------------
   */

  render() {
    const block = BEM.block('carousel')
    const inner = block.element('inner')
    const container = inner.element('container')

    return (
      <Host
        class={{
          ...this.swiper.cssSwiper(),
          ...block.class(),
          ...block.modifier(this.interface).class(this.interface !== ''),
          ...block.modifier(`full-height`).class(this.fullHeight),
          ...block.modifier('controls-sticky').class(this.controlsSticky),
          ...block.modifier(`controls-tabs`).class(this.controls === 'tabs'),
        }}
      >
        {this.isLargestContentfulPaintDone && this.controls === 'tabs' ? (
          <TabControl
            value={this.value}
            items={this.swiper.getAllControlItems()}
            containerId={this.swiper.containerId}
            onControlChange={item => this.swiper.onControlChange(item.value)}
          ></TabControl>
        ) : (
          ''
        )}
        <div
          class={{
            ...this.swiper.cssInnerSwiper(),
            ...inner.class(),
            ...inner.modifier(`is-${this.aspectRatio}`).class(),
            ...inner.modifier(`inverted`).class(this.inverted),
            ...inner.modifier(`full-height`).class(this.fullHeight),
          }}
          ref={el => (this.swiper.innerEl = el)}
        >
          <div
            id={this.swiper.containerId}
            role={this.controls === 'tabs' ? '' : 'list'}
            class={{
              ...this.swiper.cssSwiperContainer(),
              ...container.class(),
              ...container.modifier(`border`).class(this.border),
              ...container.modifier(`is-${this.aspectRatio}`).class(),
            }}
            ref={el => (this.swiper.containerEl = el)}
          >
            <slot></slot>
            {this.border ? (
              <div
                id={`${this.swiper.id}-border`}
                aria-hidden="true"
                class={{
                  ...container.element('border').class(),
                  ...container.element('border').modifier('inverted').class(this.inverted),
                }}
                ref={el => (this.swiper.borderEl = el)}
              ></div>
            ) : (
              ''
            )}
          </div>
        </div>

        {this.isLargestContentfulPaintDone ? this.swiper.renderControls() : ''}
      </Host>
    )
  }
}
