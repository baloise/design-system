import { Component, Host, h, Prop, Event, EventEmitter, Element } from '@stencil/core'
import { stopEventBubbling } from '../../../helpers/form-input.helpers'
import { Props } from '../../../types'
import { BEM } from '../../../utils/bem'

@Component({
  tag: 'bal-list-item',
})
export class ListItem {
  @Element() el!: HTMLElement

  /**
   * If `true` the list item can be hovered
   */
  @Prop() disabled = false

  /**
   * If `true` the list item shows that it is clickable
   */
  @Prop() clickable = false

  /**
   * If `true` the list item has a selected theme
   */
  @Prop() selected = false

  /**
   * If `true` the list item can be used as a accordion
   */
  @Prop() accordion = false

  /**
   * If `true` the list item can be used as an accordion inside another accordion
   */
  @Prop() subAccordionItem = false

  /**
   * Specifies the URL of the page the link goes to
   */
  @Prop() href = ''

  /**
   * Specifies where to open the linked document
   */
  @Prop() target: Props.BalListItemTarget = '_self'

  /**
   * Emitted when the link element has clicked
   */
  @Event() balNavigate!: EventEmitter<MouseEvent>

  connectedCallback() {
    const accordionHead = this.findAccordionHead()
    if (accordionHead) {
      accordionHead.addEventListener('balAccordionChange', (event: CustomEvent<boolean>) =>
        this.updateState(event.detail),
      )
    }
  }

  disconnectedCallback() {
    const accordionHead = this.findAccordionHead()
    if (accordionHead) {
      accordionHead.removeEventListener('balAccordionChange', (event: CustomEvent<boolean>) =>
        this.updateState(event.detail),
      )
    }
  }

  findAccordionHead(): any | null {
    return this.el.querySelector('bal-list-item-accordion-head')
  }

  findAccordionBody(): any | null {
    return this.el.querySelector('bal-list-item-accordion-body')
  }

  updateState(isAccordionOpen: boolean) {
    const accordionBody = this.findAccordionBody()
    if (accordionBody) {
      accordionBody.open = isAccordionOpen
    }
  }

  render() {
    const itemEl = BEM.block('list').element('item')

    const basicClasses = {
      ...itemEl.class(),
      ...itemEl.modifier('disabled').class(this.disabled),
      ...itemEl.modifier('selected').class(this.selected),
      ...itemEl.modifier('accordion').class(this.accordion),
      ...itemEl.modifier('sub-accordion').class(this.subAccordionItem),
      ...itemEl
        .modifier('clickable')
        .class(!this.disabled && (this.clickable || this.href.length > 0 || this.accordion)),
    }

    if (this.href.length > 0 && !this.disabled) {
      return (
        <Host
          role="listitem"
          class={{
            ...basicClasses,
          }}
        >
          <a
            href={this.href}
            target={this.target}
            onClick={(event: MouseEvent) => {
              this.balNavigate.emit(event)
            }}
          >
            <slot></slot>
          </a>
        </Host>
      )
    }

    if (this.clickable) {
      return (
        <Host
          role="listitem"
          class={{
            ...basicClasses,
          }}
        >
          <button
            disabled={this.disabled}
            onClick={(event: MouseEvent) => {
              this.balNavigate.emit(event)
            }}
          >
            <slot></slot>
          </button>
        </Host>
      )
    }

    if (this.accordion) {
      return (
        <Host
          role="listitem"
          class={{
            ...basicClasses,
          }}
          onClick={(event: MouseEvent) => {
            stopEventBubbling(event)
            this.balNavigate.emit(event)
          }}
        >
          <div>
            <slot></slot>
          </div>
        </Host>
      )
    }

    return (
      <Host
        role="listitem"
        class={{
          ...basicClasses,
        }}
      >
        <div>
          <slot></slot>
        </div>
      </Host>
    )
  }
}
