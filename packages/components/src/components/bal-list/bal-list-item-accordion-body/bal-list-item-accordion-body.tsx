import { Component, Host, h, Prop, Element, ComponentInterface, Listen } from '@stencil/core'
import { debounce, raf } from '@/components/utils/helpers'
import { Loggable, LogInstance, Logger } from '@/components/utils/log'
import { balBreakpoints } from '@/components/utils/breakpoints'
import { ResizeHandler, ResizeObserverHandler } from '@/components/utils/resize'

@Component({
  tag: 'bal-list-item-accordion-body',
  scoped: false,
  shadow: false,
})
export class ListItemAccordionBody implements ComponentInterface, Loggable {
  private contentElWrapper: HTMLDivElement | undefined
  private currentRaf: number | undefined
  private resizeHandler = ResizeObserverHandler()
  private resizeWidthHandler = ResizeHandler()
  private isMobile = balBreakpoints.isMobile

  @Element() el!: HTMLElement

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
    this.resizeHandler.connect(this.el, this.debounceSetMinHeightForAnimation)
    this.setMinHeightForAnimation()
  }

  componentDidRender() {
    this.setMinHeightForAnimation()
  }

  disconnectedCallback() {
    this.resizeHandler.disconnect()
  }

  /**
   * LISTENERS
   * ------------------------------------------------------
   */

  @Listen('resize', { target: 'window' })
  async resizeListener() {
    this.resizeWidthHandler(() => {
      this.isMobile = balBreakpoints.isMobile
      this.debounceSetMinHeightForAnimation()
    })
  }

  /**
   * PRIVATE METHODS
   * ------------------------------------------------------
   */

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
