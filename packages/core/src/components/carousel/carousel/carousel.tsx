import { Component, Element, Event, EventEmitter, h, Host, Listen, Method, Prop, State } from '@stencil/core'
import { HTMLStencilElement } from '@stencil/core/internal'
import {
  Logger,
  type LogInstance,
  stopEventBubbling,
  ValidateEmptyOrOneOf,
  ValidateEmptyOrType,
  setupValidation,
} from '@utils'
import {
  DsComponentInterface,
  DsConfigObserver,
  DsConfigState,
  DsLanguage,
  DsRegion,
  ListenToConfig,
  defaultConfig,
} from '@global'
import {
  CAROUSEL_CONTROLS,
  CarouselControls,
  CAROUSEL_VARIANTS,
  CarouselVariant,
  CarouselChangeDetail,
} from '../carousel.interfaces'
import { i18nDsCarousel } from './carousel.i18n'

/**
 * Carousel coordinates ds-carousel-item children into a scrollable, accessible slide interface. Supports an image slider and a product tile strip.
 *
 * @slot - ds-carousel-item children.
 * @part track - The scrollable item track.
 */
@Component({
  tag: 'ds-carousel',
  styleUrl: 'carousel.host.scss',
  shadow: true,
})
export class Carousel implements DsComponentInterface, DsConfigObserver {
  log!: LogInstance

  @Logger('carousel')
  createLogger(log: LogInstance) {
    this.log = log
  }

  @Element() el!: HTMLStencilElement

  @State() language: DsLanguage = defaultConfig.language
  @State() region: DsRegion = defaultConfig.region
  @State() private activeIndex = 0
  @State() private itemCount = 0
  @State() private canScrollLeft = false
  @State() private canScrollRight = false
  @State() private dragging = false

  /**
   * PUBLIC PROPERTY API
   * ------------------------------------------------------
   */

  /**
   * Control style. `dots` shows dot pagination with prev/next arrows (image variant). `large` shows large side arrows (product variant). `none` hides all controls.
   */
  @Prop()
  @ValidateEmptyOrOneOf(...CAROUSEL_CONTROLS)
  readonly controls: CarouselControls = 'dots'

  /**
   * Visual variant. `slide` uses scroll-snap and shows one slide at a time. `tile` shows multiple items with free scrolling.
   */
  @Prop()
  @ValidateEmptyOrOneOf(...CAROUSEL_VARIANTS)
  readonly variant: CarouselVariant = 'slide'

  /**
   * Number of items visible at once. `auto` sizes items by content. A number divides the container width equally.
   */
  @Prop()
  readonly itemsPerView: number | 'auto' = 'auto'

  /**
   * Accessible label for the carousel region.
   */
  @Prop()
  @ValidateEmptyOrType('string')
  readonly label: string = ''

  /**
   * Number of items to advance per arrow click.
   */
  @Prop()
  @ValidateEmptyOrType('number')
  readonly steps: number = 1

  /**
   * Name of the currently selected ds-carousel-item.
   */
  @Prop({ mutable: true, reflect: true })
  @ValidateEmptyOrType('string')
  value?: string | null

  /**
   * Emitted when the selected item changes.
   */
  @Event() dsChange!: EventEmitter<CarouselChangeDetail>

  /**
   * @internal define config for the component
   */
  @Method()
  @ListenToConfig()
  async configChanged(state: DsConfigState): Promise<void> {
    this.language = state.language
    this.region = state.region
  }

  private trackEl?: HTMLElement
  private resizeObserver?: ResizeObserver
  private intersectionObserver?: IntersectionObserver
  private momentumAnimId = 0
  private dragStartX = 0
  private dragStartScrollLeft = 0
  private velocityHistory: Array<{ x: number; t: number }> = []

  /**
   * LIFECYCLE
   * ------------------------------------------------------
   */

  connectedCallback() {
    setupValidation(this)
  }

  componentWillUpdate() {
    setupValidation(this)
  }

  componentDidLoad() {
    this.setup()
    this.initScroll()
    this.initIntersection()
  }

  componentDidUpdate() {
    this.updateChildren()
    if (this.variant === 'tile') this.checkOverflow()
  }

  disconnectedCallback() {
    this.resizeObserver?.disconnect()
    this.intersectionObserver?.disconnect()
    this.trackEl?.removeEventListener('scroll', this.checkOverflow)
    cancelAnimationFrame(this.momentumAnimId)
  }

  /**
   * PROPERTY VALIDATION
   * ------------------------------------------------------
   */

  // Validation is handled by @Validate decorators via setupValidation(this)

  /**
   * PUBLIC LISTENERS
   * ------------------------------------------------------
   */

  @Listen('dsCarouselItemSelect')
  listenToDsCarouselItemSelect(ev: CustomEvent<{ name: string }>) {
    stopEventBubbling(ev)
    this.activateItem(ev.detail.name)
  }

  /**
   * EVENT HANDLERS
   * ------------------------------------------------------
   */

  private handleKeyDown = (ev: KeyboardEvent) => {
    const items = this.getItems()
    const currentIndex = items.findIndex(i => i.name === this.value)
    const isForward = ev.key === 'ArrowRight'
    const isBackward = ev.key === 'ArrowLeft'

    if (ev.key === 'Home') {
      ev.preventDefault()
      this.activateItem(items[0]?.name)
    } else if (ev.key === 'End') {
      ev.preventDefault()
      this.activateItem(items[items.length - 1]?.name)
    } else if (isForward) {
      ev.preventDefault()
      this.activateItem(items[(currentIndex + 1) % items.length]?.name)
    } else if (isBackward) {
      ev.preventDefault()
      this.activateItem(items[(currentIndex - 1 + items.length) % items.length]?.name)
    }
  }

  private handleSlotChange = () => {
    this.setup()
    this.initIntersection()
  }

  private scrollPrev = () => {
    const el = this.trackEl
    if (!el) return
    if (this.variant === 'slide') {
      el.scrollBy({ left: -(el.clientWidth * this.steps), behavior: 'smooth' })
      return
    }
    const items = this.getItems()
    const firstVisible = this.getFirstVisibleIndex(items, el)
    const target = items[Math.max(firstVisible - this.steps, 0)]
    if (!target) return
    const fadeWidth = this.getFadeWidthPx()
    const dx = target.getBoundingClientRect().left - el.getBoundingClientRect().left - fadeWidth
    el.scrollBy({ left: dx, behavior: 'smooth' })
  }

  private scrollNext = () => {
    const el = this.trackEl
    if (!el) return
    if (this.variant === 'slide') {
      el.scrollBy({ left: el.clientWidth * this.steps, behavior: 'smooth' })
      return
    }
    const items = this.getItems()
    const firstVisible = this.getFirstVisibleIndex(items, el)
    const target = items[Math.min(firstVisible + this.steps, items.length - 1)]
    if (!target) return
    const fadeWidth = this.getFadeWidthPx()
    const dx = target.getBoundingClientRect().left - el.getBoundingClientRect().left - fadeWidth
    el.scrollBy({ left: dx, behavior: 'smooth' })
  }

  private getFirstVisibleIndex(items: HTMLDsCarouselItemElement[], trackEl: HTMLElement): number {
    const trackLeft = trackEl.getBoundingClientRect().left
    for (let i = 0; i < items.length; i++) {
      if (items[i].getBoundingClientRect().left >= trackLeft - 2) return i
    }
    return 0
  }

  private getFadeWidthPx(): number {
    const outer = this.trackEl?.parentElement
    if (!outer) return 0
    return parseFloat(getComputedStyle(outer, '::before').width) || 0
  }

  private checkOverflow = () => {
    const el = this.trackEl
    if (!el) return
    this.canScrollLeft = el.scrollLeft > 0
    this.canScrollRight = el.scrollLeft + el.clientWidth < el.scrollWidth - 1
  }

  private handlePointerDown = (ev: PointerEvent) => {
    const el = this.trackEl
    if (!el) return
    cancelAnimationFrame(this.momentumAnimId)
    this.dragging = true
    this.dragStartX = ev.clientX
    this.dragStartScrollLeft = el.scrollLeft
    this.velocityHistory = []
    // Disable CSS smooth-scroll during drag so track follows pointer exactly
    el.style.scrollBehavior = 'auto'
    el.setPointerCapture(ev.pointerId)
  }

  private handlePointerMove = (ev: PointerEvent) => {
    if (!this.dragging || !this.trackEl) return
    const dx = ev.clientX - this.dragStartX
    this.trackEl.scrollLeft = this.dragStartScrollLeft - dx
    this.velocityHistory.push({ x: ev.clientX, t: performance.now() })
    if (this.velocityHistory.length > 5) this.velocityHistory.shift()
  }

  private handlePointerUp = (ev: PointerEvent) => {
    if (!this.dragging || !this.trackEl) return
    const el = this.trackEl
    this.dragging = false
    el.style.scrollBehavior = ''
    el.releasePointerCapture(ev.pointerId)

    const velocity = this.calcVelocity()

    if (this.variant === 'slide') {
      const slideWidth = el.clientWidth
      const travelDx = this.dragStartScrollLeft - el.scrollLeft
      // Commit next/prev if swipe is fast enough or covers > 25 % of slide width
      if (velocity > 0.3 || travelDx < -(slideWidth * 0.25)) {
        this.scrollNext()
      } else if (velocity < -0.3 || travelDx > slideWidth * 0.25) {
        this.scrollPrev()
      } else {
        el.scrollTo({ left: this.dragStartScrollLeft, behavior: 'smooth' })
      }
    } else {
      this.applyMomentum(velocity)
    }
  }

  // px/ms — positive means pointer moved left → content scrolled right
  private calcVelocity(): number {
    const h = this.velocityHistory
    if (h.length < 2) return 0
    const dt = h[h.length - 1].t - h[0].t
    return dt > 0 ? (h[0].x - h[h.length - 1].x) / dt : 0
  }

  private applyMomentum(velocity: number) {
    const el = this.trackEl
    if (!el) return
    // Convert px/ms to per-frame pixels at ~60 fps (16 ms/frame)
    let v = velocity * 16
    const friction = 0.94

    const step = () => {
      if (Math.abs(v) < 0.5) return
      el.scrollLeft += v
      v *= friction
      this.momentumAnimId = requestAnimationFrame(step)
    }

    this.momentumAnimId = requestAnimationFrame(step)
  }

  private handlePaginationChange = (ev: CustomEvent<number>) => {
    stopEventBubbling(ev)
    const items = this.getItems()
    const item = items[ev.detail - 1]
    if (item) this.activateItem(item.name)
  }

  /**
   * PRIVATE METHODS
   * ------------------------------------------------------
   */

  private getItems(): HTMLDsCarouselItemElement[] {
    return Array.from(this.el.querySelectorAll<HTMLDsCarouselItemElement>(':scope > ds-carousel-item'))
  }

  private setup() {
    const items = this.getItems()
    this.itemCount = items.length

    items.forEach((item, i) => {
      item.index = i + 1
      item.carouselVariant = this.variant
      if (this.itemsPerView !== 'auto') {
        item.style.setProperty('--carousel-item-width', `calc(100% / ${this.itemsPerView})`)
      }
    })

    if (!this.value && items.length) {
      this.value = items[0].name
    }

    this.updateChildren()
  }

  private updateChildren() {
    const items = this.getItems()
    items.forEach(item => {
      item.carouselVariant = this.variant
      item.selected = item.name === this.value
    })
    this.activeIndex = items.findIndex(i => i.name === this.value)
  }

  private activateItem(name: string) {
    if (!name || name === this.value) return
    this.value = name
    this.dsChange.emit({ value: name })
    this.scrollToActive()
  }

  private scrollToActive() {
    const items = this.getItems()
    const active = items.find(i => i.name === this.value)
    if (active) {
      active.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'smooth' })
    }
  }

  private initScroll() {
    const el = this.trackEl
    if (!el || this.variant !== 'tile') return
    el.addEventListener('scroll', this.checkOverflow, { passive: true })
    this.resizeObserver = new ResizeObserver(this.checkOverflow)
    this.resizeObserver.observe(el)
    this.checkOverflow()
  }

  private initIntersection() {
    this.intersectionObserver?.disconnect()
    if (this.variant !== 'slide' || !this.trackEl) return

    this.intersectionObserver = new IntersectionObserver(
      entries => {
        const visible = entries.find(e => e.isIntersecting && e.intersectionRatio >= 0.5)
        if (!visible) return
        const items = this.getItems()
        const idx = items.findIndex(i => i === visible.target)
        if (idx !== -1) {
          this.activeIndex = idx
          this.value = items[idx].name
        }
      },
      { root: this.trackEl, threshold: 0.5 },
    )

    this.getItems().forEach(item => this.intersectionObserver!.observe(item))
  }

  /**
   * RENDER
   * ------------------------------------------------------
   */

  render() {
    const i18n = i18nDsCarousel[this.language]
    const isSlide = this.variant === 'slide'
    const showPagination = this.controls === 'dots'
    const showLargeArrows = this.controls === 'large'

    const prevBtn = (
      <button class="scroll-btn scroll-btn--prev" aria-label={i18n.scrollLeft} tabIndex={-1} onClick={this.scrollPrev}>
        <ds-icon name="caret-left" size="sm" />
      </button>
    )

    const nextBtn = (
      <button class="scroll-btn scroll-btn--next" aria-label={i18n.scrollRight} tabIndex={-1} onClick={this.scrollNext}>
        <ds-icon name="caret-right" size="sm" />
      </button>
    )

    const track = (
      <div
        class={{ 'carousel-track': true, 'is-dragging': this.dragging }}
        part="track"
        role="region"
        aria-label={this.label || i18n.scrollLeft}
        onKeyDown={this.handleKeyDown}
        onPointerDown={this.handlePointerDown}
        onPointerMove={this.handlePointerMove}
        onPointerUp={this.handlePointerUp}
        onPointerCancel={this.handlePointerUp}
        ref={el => {
          this.trackEl = el as HTMLElement
        }}
      >
        <slot onSlotchange={this.handleSlotChange} />
      </div>
    )

    const atStart = this.activeIndex === 0
    const atEnd = this.activeIndex === this.itemCount - 1

    return (
      <Host
        class={{
          'is-slide': isSlide,
          'is-tile': !isSlide,
          'has-overflow': this.canScrollLeft || this.canScrollRight,
          'can-scroll-left': this.canScrollLeft,
          'can-scroll-right': this.canScrollRight,
        }}
      >
        <div class="carousel-outer">
          {showLargeArrows && (isSlide ? !atStart && prevBtn : prevBtn)}
          {track}
          {showLargeArrows && (isSlide ? !atEnd && nextBtn : nextBtn)}
        </div>
        {showPagination && (
          <ds-pagination
            class="pagination"
            variant="dots"
            totalPages={this.itemCount}
            value={this.activeIndex + 1}
            textPrevious={i18n.scrollLeft}
            textNext={i18n.scrollRight}
            onDsChange={this.handlePaginationChange}
          />
        )}
      </Host>
    )
  }
}
