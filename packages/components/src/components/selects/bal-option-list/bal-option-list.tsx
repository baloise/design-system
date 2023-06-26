import { Component, h, ComponentInterface, Host, Element, Prop, Watch, Method, Listen } from '@stencil/core'
import { BEM } from '../../../utils/bem'
import { LogInstance, Loggable, Logger } from '../../../utils/log'
import { Attributes, inheritAttributes } from '../../../utils/attributes'
import { raf } from '../../../utils/helpers'

@Component({
  tag: 'bal-option-list',
  styleUrls: {
    css: 'bal-option-list.sass',
  },
})
export class OptionList implements ComponentInterface, Loggable {
  private id = `bal-option-list-${balOptionListIds++}`
  private inheritAttributes: Attributes = {}
  private focusRaf: number | undefined

  @Element() el!: HTMLElement

  log!: LogInstance

  @Logger('bal-option-list')
  createLogger(log: LogInstance) {
    this.log = log
  }

  /**
   * PUBLIC PROPERTY API
   * ------------------------------------------------------
   */

  @Prop({ mutable: true }) focusIndex = -1

  @Prop() contentHeight?: number = 282
  @Watch('contentHeight') contentHeightChanged(value?: number) {
    if (value === undefined) {
      this.el.style.removeProperty('--bal-option-list-max-height')
    } else {
      this.el.style.setProperty('--bal-option-list-max-height', `${value}px`)
    }
  }

  /**
   * LIFECYCLE
   * ------------------------------------------------------
   */

  componentDidLoad(): void {
    this.contentHeightChanged(this.contentHeight)
  }

  componentWillRender() {
    this.inheritAttributes = inheritAttributes(this.el, ['aria-multiselectable', 'aria-labelledby'])
  }

  /**
   * LISTENERS
   * ------------------------------------------------------
   */

  @Listen('balOptionFocus', { passive: true })
  listenToMouseEnter(ev: BalEvents.BalOptionFocus) {
    const options = this.options
    const indexToFocus = this.getOptionIndex(options, ev.detail.value)
    if (indexToFocus !== undefined) {
      this.updateFocus(options, indexToFocus)
    }
  }

  /**
   * PUBLIC METHODS
   * ------------------------------------------------------
   */

  @Method() async resetFocus(): Promise<number> {
    const options = this.options
    const indexToFocus = -1
    this.updateFocus(options, indexToFocus)
    return indexToFocus
  }

  @Method() async focusFirst(): Promise<number> {
    const options = this.options
    const indexToFocus = this.getFirstOptionIndex(options)
    this.updateFocus(options, indexToFocus)
    this.scrollTo(0)

    return indexToFocus
  }

  @Method() async focusLast(): Promise<number> {
    const options = this.options
    const indexToFocus = this.getLastOptionIndex(options)
    this.updateFocus(options, indexToFocus)

    const option = options[indexToFocus]
    this.updateScrollBottomPosition(option)

    return indexToFocus
  }

  @Method() async focusNext(): Promise<number> {
    const options = this.options
    const indexToFocus = this.getNextOptionIndex(options)
    this.updateFocus(options, indexToFocus)

    const option = options[indexToFocus]
    this.updateScrollBottomPosition(option)

    return indexToFocus
  }

  @Method() async focusPrevious(): Promise<number> {
    const options = this.options
    const indexToFocus = this.getPreviousOptionIndex(options)
    this.updateFocus(options, indexToFocus)

    const option = options[indexToFocus]
    this.updateScrollTopPosition(option)

    return indexToFocus
  }

  /**
   * GETTERS
   * ------------------------------------------------------
   */

  private get options(): HTMLBalOptionElement[] {
    return Array.from(this.el.querySelectorAll('bal-option'))
  }

  /**
   * PRIVATE METHODS
   * ------------------------------------------------------
   */

  private isOptionVisible(option: HTMLBalOptionElement): boolean {
    const visibleHeight = this.el.clientHeight
    const topPosition = this.el.scrollTop
    const bottomPosition = topPosition + visibleHeight
    const isVisible = topPosition <= option.offsetTop && option.offsetTop + option.clientHeight <= bottomPosition
    return isVisible
  }

  private updateScrollTopPosition(option: HTMLBalOptionElement) {
    if (option) {
      const isVisible = this.isOptionVisible(option)
      if (!isVisible) {
        this.scrollTo(this.getScrollTopForTopPosition(option))
      }
    }
  }

  private updateScrollBottomPosition(option: HTMLBalOptionElement) {
    if (option) {
      const isVisible = this.isOptionVisible(option)
      if (!isVisible) {
        this.scrollTo(this.getScrollTopForBottomPosition(option))
      }
    }
  }

  private getScrollTopForTopPosition(option: HTMLBalOptionElement): number {
    const topPosition = option.offsetTop
    const scrollTop = topPosition

    if (scrollTop < 0) {
      return 0
    }

    return scrollTop
  }

  private getScrollTopForBottomPosition(option: HTMLBalOptionElement): number {
    const visibleHeight = this.el.clientHeight
    const bottomPosition = option.offsetTop + option.clientHeight
    const scrollTop = bottomPosition - visibleHeight

    if (scrollTop < 0) {
      return 0
    }

    return scrollTop
  }

  private async scrollTo(scrollTop: number) {
    if (scrollTop) {
      if (this.focusRaf !== undefined) {
        cancelAnimationFrame(this.focusRaf)
      }

      this.focusRaf = raf(async () => {
        this.el.scrollTop = scrollTop
      })
    }
  }

  private updateFocus(options: HTMLBalOptionElement[], indexToFocus: number) {
    this.focusIndex = indexToFocus
    for (let index = 0; index < options.length; index++) {
      const option = options[index]
      option.focused = index === indexToFocus
    }
  }

  private getOptionIndex(options: HTMLBalOptionElement[], value: string): number | undefined {
    for (let index = 0; index < options.length; index++) {
      const option = options[index]
      if (option.value === value) {
        return index
      }
    }

    return undefined
  }

  private getFirstOptionIndex(options: HTMLBalOptionElement[]): number {
    for (let index = 0; index < options.length; index++) {
      const option = options[index]
      if (!option.disabled) {
        return index
      }
    }
    return this.focusIndex
  }

  private getNextOptionIndex(options: HTMLBalOptionElement[]): number {
    if (this.focusIndex < 0) {
      return 0
    }

    const lastIndex = options.length - 1
    if (this.focusIndex !== lastIndex) {
      return this.focusIndex + 1
    }

    return this.focusIndex
  }

  private getPreviousOptionIndex(_options: HTMLBalOptionElement[]): number {
    if (this.focusIndex <= 0) {
      return 0
    }

    return this.focusIndex - 1
  }

  private getLastOptionIndex(options: HTMLBalOptionElement[]): number {
    for (let index = options.length - 1; index >= 0; index--) {
      const option = options[index]
      if (!option.disabled) {
        return index
      }
    }
    return this.focusIndex
  }

  /**
   * RENDER
   * ------------------------------------------------------
   */

  render() {
    const block = BEM.block('option-list')

    return (
      <Host
        class={{
          ...block.class(),
        }}
        id={this.id}
        tabIndex={-1}
        data-testid="bal-option-list"
      >
        <div
          role="listbox"
          class={{
            ...block.element('container').class(),
          }}
          {...this.inheritAttributes}
        >
          <slot></slot>
        </div>
      </Host>
    )
  }
}

let balOptionListIds = 0
