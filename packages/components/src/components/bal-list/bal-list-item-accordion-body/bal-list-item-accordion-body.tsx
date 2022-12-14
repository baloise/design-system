import { Component, Host, h, Prop, Element, ComponentInterface } from '@stencil/core'
import { Props } from '../../../types'
import { Loggable, LogInstance, Logger } from '../../../utils/log'

@Component({
  tag: 'bal-list-item-accordion-body',
  scoped: false,
  shadow: false,
})
export class ListItemAccordionBody implements ComponentInterface, Loggable {
  private contentElWrapper: HTMLDivElement | undefined

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
   * Sets justify-content of the items to start, center, end, or space-between. Default is start
   */
  @Prop() contentAlignment: Props.BalListContentSpacing = 'start'

  /**
   * LIFECYCLE
   * ------------------------------------------------------
   */

  componentDidRender() {
    if (this.accordionGroup !== undefined || this.accordionGroup !== '') {
      const allAccordionBodies = Array.from(document.body.querySelectorAll('bal-list-item-accordion-body'))
      const groupContents = allAccordionBodies
        .filter(el => el.accordionGroup === this.accordionGroup)
        .map(el => el.querySelector('.bal-list__item__accordion-body__content'))
        .filter(el => el) as HTMLElement[]

      const groupContentHeight = groupContents.reduce((acc, el) => (acc < el.offsetHeight ? el.offsetHeight : acc), 0)
      if (this.contentElWrapper) {
        this.contentElWrapper.style.setProperty('min-height', `${groupContentHeight}px`)
      }
    }
  }

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
          }}
          ref={contentElWrapper => (this.contentElWrapper = contentElWrapper)}
        >
          <slot></slot>
        </div>
      </Host>
    )
  }
}
