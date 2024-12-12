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

  id = `bal-swiper-${SwiperIds++}`
  containerId = `${this.id}-container`

  containerEl?: HTMLElement
  innerEl?: HTMLElement
  borderEl?: HTMLElement

  index = 0
  gapSize = 0
  steps = 1
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
  }

  public disconnectedCallback() {
    removeEventListener(window, 'keydown', this.listenToKeyDown)
    removeEventListener(this.component.el, 'focusin', this.updateFocus)
  }

  private updateFocus = (ev: KeyboardEvent) => {
    const focusedButton = ev.target
    console.warn('=> updateFocus', focusedButton)
  }

  private listenToKeyDown = (ev: KeyboardEvent) => {
    console.warn('listenToKeyDown')
    // debugger
    // if (isTabKey(ev)) {
    //   if (ev.shiftKey) {
    //     this.focusPreviousItem(ev)
    //   } else {
    //     this.focusNextItem(ev)
    //   }
    // }
  }

  public async focusNextItem(ev: KeyboardEvent) {
    if (!this.isLast()) {
      const slide = await this.next(1)
      if (slide && slide.el) {
        stopEventBubbling(ev)
        await slide.el.setFocus()
      }
    }
  }

  public async focusPreviousItem(ev: KeyboardEvent) {
    if (!this.isFirst()) {
      const slide = await this.previous(1)
      if (slide && slide.el) {
        stopEventBubbling(ev)
        await slide.el.setFocus()
      }
    }
  }

  /**
   * CSS Classes
   * ------------------------------------------------------
   */

  private cssBlock = BEM.block('swiper')

  public cssSwiper = () => ({
    ...this.cssBlock.class(),
  })

  public cssInnerSwiper = () => ({
    ...this.cssBlock.element('inner').class(),
    ...this.cssBlock.element('inner').modifier(`items-per-view-${this.itemsPerView}`).class(),
    ...this.cssBlock.element('inner').modifier(`shadow-left`).class(this.hasShadowLeft()),
    ...this.cssBlock.element('inner').modifier(`shadow-right`).class(this.hasShadowRight()),
  })

  public cssSwiperContainer = () => ({
    ...this.cssBlock.element('container').class(),
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
    return this.hasShadow() && this.index !== 0
  }

  public hasShadowRight(): boolean {
    return this.hasShadow() && !this.isLastSlideVisible
  }

  public isLast(): boolean {
    return this.isLastSlideVisible
  }

  public async previous(steps = this.steps): Promise<SwiperSlide | undefined> {
    let previousValue = this.index - steps
    if (previousValue < 0) {
      previousValue = 0
    }

    const activeSlide = await this.buildSlide(previousValue)

    if (activeSlide) {
      const didAnimate = await this.animate(activeSlide.transformActive, true)
      if (didAnimate || this.index !== previousValue) {
        this.index = previousValue
        this.component.swiperOnChange(this.index)
      }
    }

    return activeSlide
  }

  public async next(steps = this.steps): Promise<SwiperSlide | undefined> {
    const items = this.component.swiperGetAllChildrenElements()
    const length = items.length
    let nextValue = this.index + steps

    if (nextValue >= length) {
      nextValue = length - 1
    }

    const activeSlide = await this.buildSlide(nextValue)

    if (activeSlide) {
      const didAnimate = await this.animate(activeSlide.transformActive, true)
      if (didAnimate || this.index !== nextValue) {
        this.index = nextValue
        this.component.swiperOnChange(this.index)
      }
    }

    return activeSlide
  }

  public renderControls() {
    if (!this.component.isLargestContentfulPaintDone) {
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

  private hasShadow(): boolean {
    return this.itemsPerView === 'auto' || this.itemsPerView > 1
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
    const index = slideIndex === undefined ? items.length - 1 : slideIndex

    if (items.length > index && index >= 0) {
      const gapSize = this.gapSize

      return {
        el: items[index],
        transformNext: items
          .filter((_, n) => n < index + 1)
          .reduce((acc, item) => acc + getComputedWidth(item) + gapSize, 0),
        transformActive: items
          .filter((_, n) => n < index)
          .reduce((acc, item) => acc + getComputedWidth(item) + gapSize, 0),
        isFirst: index === 0,
        isLast: index === items.length - 1,
        total: items.length,
        index,
      }
    }
    return undefined
  }

  private async animate(amount = 0, animated = true): Promise<boolean> {
    return new Promise(resolve => {
      if (this.currentRaf !== undefined) {
        cancelAnimationFrame(this.currentRaf)
      }

      this.currentRaf = raf(async () => {
        if (this.containerEl && this.innerEl) {
          const lastSlide = await this.buildSlide()

          if (lastSlide) {
            const containerWidth = this.innerEl.clientWidth || 0
            const itemsWith = lastSlide.transformNext || 0
            const noNeedForSlide = itemsWith <= containerWidth
            let maxAmount = itemsWith - containerWidth
            let isLastSlideVisible = maxAmount <= amount
            // -1 one is needed for example when we use items per view 3 with 33.333%
            if (this.itemsPerView === 3) {
              maxAmount = itemsWith - containerWidth - 1
              isLastSlideVisible = maxAmount <= amount
            }
            const isFirst = amount === 0 || maxAmount <= 2

            if (isFirst) {
              this.index = 0
              this.component.swiperOnChange(this.index)
            }

            const hasSmallControls = this.controls === 'small'
            const hasLargeControls = this.controls === 'large'

            let transformValue = noNeedForSlide ? 0 : isLastSlideVisible ? maxAmount : amount

            if (!isFirst && !noNeedForSlide && (hasSmallControls || (hasLargeControls && !this.component.isMobile))) {
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
