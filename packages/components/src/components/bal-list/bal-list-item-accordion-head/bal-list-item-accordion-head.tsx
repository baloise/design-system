import { Component, Host, h, Element, EventEmitter, Event, Prop, Watch } from '@stencil/core'

@Component({
  tag: 'bal-list-item-accordion-head',
  scoped: false,
  shadow: false,
})
export class ListItemAccordionHead {
  @Element() el!: HTMLElement

  /**
   * If `true` the list accordion is open
   */
  @Prop() accordionOpen = false
  @Watch('accordionOpen')
  accordionOpenHandler() {
    this.balAccordionChange.emit(this.accordionOpen)
  }

  /**
   * Emitted when the accordion state is changed
   */
  @Event() balAccordionChange!: EventEmitter<boolean>

  private list?: HTMLBalListElement | null
  private iconName!: string

  connectedCallback() {
    this.list = this.el.closest('bal-list')
    this.iconName = this.list?.classList.contains('is-in-main-nav') ? 'nav-go-down' : 'plus'
    this.balAccordionChange.emit(this.accordionOpen)
  }

  getClosestListItem(): HTMLBalListItemElement | null {
    return this.el.closest('bal-list-item')
  }

  clickHandler() {
    const listItem = this.getClosestListItem()
    if (listItem) {
      this.accordionOpen = !this.accordionOpen
      this.balAccordionChange.emit(this.accordionOpen)
    }
  }

  render() {
    return (
      <Host
        class={{
          'bal-list-item-accordion-head bal-list-item': true,
          'is-open': this.accordionOpen,
        }}
        onClick={() => this.clickHandler()}
      >
        <slot></slot>
        <bal-list-item-icon right>
          <bal-icon class="trigger-icon" name={this.iconName} size="small"></bal-icon>
        </bal-list-item-icon>
      </Host>
    )
  }
}
