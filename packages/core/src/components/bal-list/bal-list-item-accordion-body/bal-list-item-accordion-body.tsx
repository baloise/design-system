import { Component, Host, h, Prop, Element, ComponentInterface, State, Method } from '@stencil/core'
import { debounce, raf } from '../../../utils/helpers'
import { Loggable, LogInstance, Logger } from '../../../utils/log'
import { BalBreakpointObserver, BalBreakpoints, ListenToBreakpoints, balBreakpoints } from '../../../utils/breakpoints'
import { BalResizeObserver, ListenToResize } from '../../../utils/resize'

export interface BalListItemAccordionBodyAria {
  labelledby?: string
}

@Component({
  tag: 'bal-list-item-accordion-body',
  scoped: false,
  shadow: false,
})
export class ListItemAccordionBody implements ComponentInterface, Loggable, BalBreakpointObserver, BalResizeObserver {
  private contentElWrapper: HTMLDivElement | undefined
  private currentRaf: number | undefined
  private isMobile = balBreakpoints.isMobile
  private internalId = `bal-list-item-accordion-body-${ListItemAccordionBodyIds++}`

  @Element() el!: HTMLElement

  @State() ariaState: BalListItemAccordionBodyAria = {}

  log!: LogInstance

  @Logger('bal-list-item-accordion-body')
  createLogger(log: LogInstance) {
    this.log = log
  }

  /**
   * PUBLIC PROPERTY API
   * ------------------------------------------------------
   */

  /**
   * Synchronizes the height of the accordion to max of all
   * the other grouped accordion bodies
   */
  @Prop() accordionGroup?: string

  /**
   * Sets space to content of the accordion body
   */
  @Prop() contentSpace: BalProps.BalListContentSpacing = 'none'

  /**
   * Sets justify-content of the items to start, center, end, or space-between. Default is start
   */
  @Prop() contentAlignment: BalProps.BalListContentAlignment = 'start'

  /**
   * LIFECYCLE
   * ------------------------------------------------------
   */

  connectedCallback() {
    this.setMinHeightForAnimation()
  }

  componentDidRender() {
    this.setMinHeightForAnimation()
    this.setControlIdToHead()
  }

  /**
   * LISTENERS
   * ------------------------------------------------------
   */

  @ListenToResize()
  resizeListener() {
    this.debounceSetMinHeightForAnimation
  }

  @ListenToBreakpoints()
  breakpointListener(breakpoints: BalBreakpoints): void {
    this.isMobile = breakpoints.mobile
    this.debounceSetMinHeightForAnimation()
  }

  /**
   * PUBLIC METHODS
   * ------------------------------------------------------
   */

  /**
   * @internal
   */
  @Method()
  async setAria(aria: BalListItemAccordionBodyAria): Promise<void> {
    this.ariaState = { ...aria }
  }

  /**
   * PRIVATE METHODS
   * ------------------------------------------------------
   */

  private setControlIdToHead() {
    const headEl = this.el.parentElement.querySelector('bal-list-item-accordion-head')
    if (headEl) {
      headEl.setAria({ controlId: this.internalId })
    }
  }

  private setMinHeightForAnimation = () => {
    if (this.currentRaf !== undefined) {
      cancelAnimationFrame(this.currentRaf)
    }

    if (this.isMobile && this.contentElWrapper) {
      this.contentElWrapper.style.removeProperty('min-height')
      return
    }

    raf(() => {
      if (this.accordionGroup !== undefined && this.accordionGroup !== '') {
        const allAccordionBodies = Array.from(document.body.querySelectorAll('bal-list-item-accordion-body'))
        const groupContents = allAccordionBodies
          .filter(el => el.accordionGroup === this.accordionGroup)
          .map(el => el.querySelector('.bal-list__item__accordion-body__content'))
          .filter(el => el) as HTMLElement[]

        const groupContentHeight = groupContents.reduce((acc, el) => (acc < el.offsetHeight ? el.offsetHeight : acc), 0)
        if (this.contentElWrapper && groupContentHeight > 0 && this.el.offsetHeight !== groupContentHeight) {
          this.contentElWrapper.style.setProperty('min-height', `${groupContentHeight}px`)
        }
      }
    })
  }
  private debounceSetMinHeightForAnimation = debounce(this.setMinHeightForAnimation.bind(this), 100)

  /**
   * RENDER
   * ------------------------------------------------------
   */

  render() {
    return (
      <Host
        id={this.internalId}
        role={'region'}
        aria-labelledby={this.ariaState.labelledby}
        class={{
          'bal-list__item': true,
          'bal-list__item__accordion-body': true,
          'bal-list__item__accordion-body--grouped': this.accordionGroup !== undefined && this.accordionGroup !== '',
        }}
      >
        <div
          class={{
            'bal-list__item__accordion-body__content': true,
            [`bal-list__item__accordion-body__content--${this.contentAlignment}`]: this.contentAlignment !== undefined,
            [`bal-list__item__accordion-body__content--space-${this.contentSpace}`]: this.contentSpace !== undefined,
          }}
          ref={contentElWrapper => (this.contentElWrapper = contentElWrapper)}
        >
          <slot></slot>
        </div>
      </Host>
    )
  }
}

let ListItemAccordionBodyIds = 0
