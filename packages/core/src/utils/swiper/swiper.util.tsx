import { h } from '@stencil/core'
import { addEventListener, debounce, isDescendant, raf, removeEventListener } from '../helpers'
import { getComputedWidth } from '../style'
import { i18nSwiperControlLabel } from './swiper.i18n'
import { SmallControl } from './controls/small-control'
import { LargeControl } from './controls/large-control'
import { DotControl } from './controls/dot-control'
import type {
  SwiperChildItem,
  SwiperControl,
  SwiperControlItem,
  SwiperInterface,
  SwiperItemsPerView,
  SwiperSlide,
} from './swiper.type'
import { BEM } from '../bem'
import { isTabKey } from '../keyboard'
import { stopEventBubbling } from '../form-input'

export class SwiperUtil {
  private component!: SwiperInterface
  private currentRaf: number | undefined
  private previousTransformValue = 0
  private active = true

  id = `bal-swiper-${SwiperIds++}`
  containerId = `${this.id}-container`

  containerEl?: HTMLElement
  innerEl?: HTMLElement
  borderEl?: HTMLElement

  index = 0
  gapSize = 0
  steps = 1
  noNeedForSlide = true
  isLastSlideVisible = false
  itemsPerView: SwiperItemsPerView = 1
  controls: SwiperControl = 'none'

  /**
   * LIFECYCLE
   * ------------------------------------------------------
   */

  public connectedCallback(component: SwiperInterface) {
    this.component = component
    addEventListener(window, 'keydown', this.listenToKeyDown)
    addEventListener(this.component.el, 'focusin', this.updateFocus)
    addEventListener(window, 'touchstart', this.pointerDown)
    addEventListener(window, 'mousedown', this.pointerDown)
  }

  public disconnectedCallback() {
    removeEventListener(window, 'keydown', this.listenToKeyDown)
    removeEventListener(this.component.el, 'focusin', this.updateFocus)
    removeEventListener(window, 'touchstart', this.pointerDown)
    removeEventListener(window, 'mousedown', this.pointerDown)
  }

  /**
   * EVENTS
   * ------------------------------------------------------
   */

  private keyboardMode = false
  private shiftMode = false
  private isInsideContainer = false
  private focusByKey = false

  private pointerDown = () => {
    this.keyboardMode = false
    this.shiftMode = false
    this.focusByKey = false
    this.isInsideContainer = false
  }

  private listenToKeyDown = (ev: KeyboardEvent) => {
    this.keyboardMode = isTabKey(ev)
    this.shiftMode = ev.shiftKey
    this.focusByKey = false
    this.isInsideContainer = isDescendant(this.containerEl, ev.target)

    if (this.controls !== 'dots' && this.controls !== 'tabs') {
      if (this.isInsideContainer && this.keyboardMode) {
        if (this.shiftMode && this.index > 0) {
          this.focusByKey = true
          this.focusPreviousItem(ev)
        } else if (!this.shiftMode && this.index < this.lastIndex()) {
          this.focusByKey = true
          this.focusNextItem(ev)
        }
      }
    }
  }

  /**
   * PUBLIC METHODS
   * ------------------------------------------------------
   */

  public async isActive() {
    return this.active
  }

  public async activate() {
    if (this.active === false) {
      // TODO: do carousel
      this.active = true
    }
  }

  public async disable() {
    if (this.active === true) {
      // TODO: remove carousel
      this.active = false
    }
  }

  public async focusItem(index: number) {
    const slide = await this.goTo(index)
    if (slide && slide.el) {
      await this.setFocusToEl(slide.el)
    }
  }

  public async focusNextItem(ev: KeyboardEvent) {
    const slide = await this.next(1)
    if (slide && slide.el) {
      stopEventBubbling(ev)
      await this.setFocusToEl(slide.el)
    }
  }

  public async focusPreviousItem(ev: KeyboardEvent) {
    const slide = await this.previous(1)
    if (slide && slide.el) {
      stopEventBubbling(ev)
      await this.setFocusToEl(slide.el)
    }
  }

  /**
   * PRIVATE METHODS
   * ------------------------------------------------------
   */

  private updateFocus = (ev: FocusEvent) => {
    const focusByKey = this.focusByKey
    const backwards = this.shiftMode
    const isInsideContainer = this.isInsideContainer

    // when the focus enters the component we focus
    // the last focused item
    if (this.controls !== 'dots' && this.controls !== 'tabs' && focusByKey && !isInsideContainer) {
      if (backwards) {
        this.focusItem(this.lastIndex())
      } else {
        this.focusItem(0)
      }
    }
  }

  private async setFocusToEl(el: SwiperChildItem) {
    if (el.setFocus) {
      await el.setFocus()
    } else {
      // el.focus()
    }
  }

  /**
   * CSS Classes
   * ------------------------------------------------------
   */

  private cssBlock = BEM.block('swiper')

  public cssSwiper = () => ({
    ...this.cssBlock.class(this.active),
  })

  public cssInnerSwiper = () => ({
    ...this.cssBlock.element('inner').class(this.active),
    ...this.cssBlock.element('inner').modifier(`items-per-view-${this.itemsPerView}`).class(this.active),
    ...this.cssBlock.element('inner').modifier(`shadow-left`).class(this.hasShadowLeft()),
    ...this.cssBlock.element('inner').modifier(`shadow-right`).class(this.hasShadowRight()),
  })

  public cssSwiperContainer = () => ({
    ...this.cssBlock.element('container').class(this.active),
  })

  /**
   * PUBLIC METHODS
   * ------------------------------------------------------
   */

  public notifyChange = debounce(() => this.notifyChangeInternal(), 100)

  public isFirst(): boolean {
    return this.index === 0
  }

  public hasShadowLeft(): boolean {
    return this.hasShadow() && this.index !== 0 && this.active
  }

  public hasShadowRight(): boolean {
    return this.hasShadow() && !this.isLastSlideVisible && this.active
  }

  public isLast(): boolean {
    return this.isLastSlideVisible
  }

  public async previous(steps = this.steps): Promise<SwiperSlide | undefined> {
    let previousValue = this.index - steps
    if (previousValue < 0) {
      previousValue = 0
    }

    return this.goTo(previousValue)
  }

  public async next(steps = this.steps): Promise<SwiperSlide | undefined> {
    const items = this.component.swiperGetAllChildrenElements()
    const length = items.length
    let nextValue = this.index + steps

    if (nextValue >= length) {
      nextValue = length - 1
    }

    return this.goTo(nextValue)
  }

  public async updateIndex(index = this.index): Promise<undefined> {
    if (this.index !== index) {
      this.index = index
      this.component.swiperOnChange(this.index)
    }
  }

  public async goTo(index = this.index): Promise<SwiperSlide | undefined> {
    const activeSlide = await this.buildSlide(index)

    if (activeSlide) {
      const didAnimate = await this.animate(activeSlide.transformActive, true)
      if (didAnimate || this.index !== index) {
        this.index = index
        this.component.swiperOnChange(this.index)
      }
    }

    return activeSlide
  }

  public renderControls() {
    if (
      !this.component.isLargestContentfulPaintDone ||
      !this.active ||
      this.noNeedForSlide ||
      !this.component.hasAnimated
    ) {
      return ''
    }

    const leftControlTitle = i18nSwiperControlLabel[this.component.language].left
    const rightControlTitle = i18nSwiperControlLabel[this.component.language].right

    switch (this.controls) {
      case 'small':
        return (
          <SmallControl
            isFirst={this.isFirst()}
            isLast={this.isLast()}
            inverted={this.component.inverted}
            leftControlTitle={leftControlTitle}
            rightControlTitle={rightControlTitle}
            containerId={this.containerId}
            onNextClick={() => this.onNextButtonClick()}
            onPreviousClick={() => this.onPreviousButtonClick()}
          ></SmallControl>
        )

      case 'large':
        return (
          <LargeControl
            isFirst={this.isFirst()}
            isLast={this.isLast()}
            inverted={this.component.inverted}
            areControlsHidden={!this.component.isMobile}
            leftControlTitle={leftControlTitle}
            rightControlTitle={rightControlTitle}
            containerId={this.containerId}
            onNextClick={() => this.onNextButtonClick()}
            onPreviousClick={() => this.onPreviousButtonClick()}
          ></LargeControl>
        )

      case 'dots':
        return (
          <DotControl
            value={this.index}
            items={this.getAllControlItems()}
            containerId={this.containerId}
            onControlChange={item => this.onControlChange(item.value)}
          ></DotControl>
        )

      default:
        return ''
    }
  }

  getAllControlItems(): SwiperControlItem[] {
    const items: SwiperChildItem[] = this.component.swiperGetAllChildrenElements()
    return items.map((item, index) => ({ value: index, label: item.label }))
  }

  onControlChange = (selectedValue: number) => {
    if (selectedValue !== this.index) {
      const isForward = selectedValue > this.index
      if (isForward) {
        this.next(selectedValue - this.index)
      } else {
        this.previous(this.index - selectedValue)
      }
    }
  }

  /**
   * PRIVATE METHODS
   * ------------------------------------------------------
   */

  private lastIndex() {
    const items = this.component.swiperGetAllChildrenElements()
    return items.length - 1
  }

  private hasShadow(): boolean {
    return !this.component.inverted && (this.itemsPerView === 'auto' || this.itemsPerView > 1)
  }

  private async notifyChangeInternal() {
    if (this.component.isLargestContentfulPaintDone) {
      const activeSlide = await this.buildSlide(this.index)
      if (activeSlide) {
        this.animate(activeSlide.transformActive, false)
      }
    }
  }

  private async buildSlide(slideIndex?: number): Promise<SwiperSlide | undefined> {
    const items = this.component.swiperGetAllChildrenElements()
    const index = slideIndex === undefined ? this.lastIndex() : slideIndex

    if (items.length > index && index >= 0) {
      const gapSize = this.gapSize

      const transformNext = items
        .filter((_, n) => n < index + 1)
        .reduce((acc, item) => {
          console.log('NEXT item', item, getComputedWidth(item))
          return acc + getComputedWidth(item) + gapSize
        }, 0)

      const transformActive = items
        .filter((_, n) => n < index)
        .reduce((acc, item) => {
          // console.log('ACTIVE item', item, getComputedWidth(item))
          return acc + getComputedWidth(item) + gapSize
        }, 0)

      return {
        el: items[index],
        transformNext,
        transformActive,
        isFirst: index === 0,
        isLast: index === this.lastIndex(),
        total: this.lastIndex() + 1,
        index,
      }
    }
    return undefined
  }

  private async animate(pixels = 0, animated = true): Promise<boolean> {
    console.log('--> animate', pixels)
    return new Promise(resolve => {
      if (this.currentRaf !== undefined) {
        cancelAnimationFrame(this.currentRaf)
      }

      this.currentRaf = raf(async () => {
        if (this.containerEl && this.innerEl) {
          const lastSlide = await this.buildSlide()

          if (lastSlide) {
            const totalWidth = lastSlide.transformNext || 0
            const overflowWindowWidth = this.innerEl.clientWidth || 0

            // get max amount of pixel to move the items container to the left or right
            let maxAmountOfPixel = totalWidth - overflowWindowWidth

            // -1 one is needed for example when we use items per view 3 with 33.333%
            if (this.itemsPerView === 3) {
              maxAmountOfPixel = totalWidth - overflowWindowWidth - 1
            }

            // last item is visible if the overflow window moved more than the diff
            const isLastSlideVisible = maxAmountOfPixel <= pixels

            const isFirst = pixels === 0 || maxAmountOfPixel <= 2
            if (isFirst) {
              this.index = 0
            }

            const hasSmallControls = this.controls === 'small'
            const hasLargeControls = this.controls === 'large'

            this.noNeedForSlide = totalWidth <= overflowWindowWidth
            let transformValue = this.noNeedForSlide ? 0 : isLastSlideVisible ? maxAmountOfPixel : pixels

            if (
              !isFirst &&
              !this.noNeedForSlide &&
              (hasSmallControls || (hasLargeControls && !this.component.isMobile))
            ) {
              transformValue = transformValue - (isLastSlideVisible ? 0 : hasLargeControls ? 56 : 48)
            }

            this.containerEl.style.transitionDuration = animated ? '0.6s' : '0'
            this.containerEl.style.transform = `translate3d(-${transformValue}px, 0px, 0px)`

            const didAnimate = transformValue !== this.previousTransformValue
            this.previousTransformValue = transformValue
            this.isLastSlideVisible = isLastSlideVisible

            if (this.borderEl) {
              this.borderEl.style.transitionDuration = animated ? '0.6s' : '0'
              this.borderEl.style.transform = `translate3d(${transformValue}px, 0px, 0px)`
            }

            this.component.hasAnimated = true

            if (!didAnimate) {
              return resolve(false)
            }

            return resolve(true)
          }
        }
      })
    })
  }

  private onPreviousButtonClick = () => this.previous()

  private onNextButtonClick = () => this.next()
}

let SwiperIds = 0
