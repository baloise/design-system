import { Component, Host, h, Prop, Event, EventEmitter, Element } from '@stencil/core'
import { Props } from '../../../props'

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
    if (this.href.length > 0 && !this.disabled) {
      return (
        <Host
          role="listitem"
          class={{
            'bal-list-item': true,
            'is-accordion': this.accordion,
            'is-disabled': this.disabled,
            'is-selected': this.selected,
            'is-list-item-clickable': this.clickable || this.href.length > 0,
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
            'bal-list-item': true,
            'is-disabled': this.disabled,
            'is-selected': this.selected,
            'is-list-item-clickable': this.clickable || this.href.length > 0,
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
            'bal-list-item': true,
            'is-accordion': this.accordion,
            'is-disabled': this.disabled,
            'is-list-item-clickable': this.accordion,
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
          'bal-list-item': true,
          'is-disabled': this.disabled,
          'is-selected': this.selected,
          'is-list-item-clickable': this.clickable || this.href.length > 0,
        }}
      >
        <div>
          <slot></slot>
        </div>
      </Host>
    )
  }
}
