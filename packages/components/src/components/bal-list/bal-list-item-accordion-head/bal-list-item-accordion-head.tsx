import { Component, Host, h, Element, State, EventEmitter, Event } from '@stencil/core'

@Component({
  tag: 'bal-list-item-accordion-head',
  scoped: false,
  shadow: false,
})
export class ListItemAccordionHead {
  @Element() el!: HTMLElement

  @State() isAccordionOpen = false

  /**
   * Emitted when the accordion state is changed
   */
  @Event() balAccordionChange!: EventEmitter<boolean>

  getClosestListItem(): HTMLBalListItemElement | null {
    return this.el.closest('bal-list-item')
  }

  clickHandler() {
    const listItem = this.getClosestListItem()
    if (listItem) {
      this.isAccordionOpen = !this.isAccordionOpen
      this.balAccordionChange.emit(this.isAccordionOpen)
    }
  }

  render() {
    return (
      <Host
        class={{
          'bal-list-item-accordion-head bal-list-item': true,
          'is-open': this.isAccordionOpen,
        }}
        onClick={() => this.clickHandler()}
      >
        <slot></slot>
        <bal-list-item-icon right>
          <bal-icon class="trigger-icon" name="plus" size="small"></bal-icon>
        </bal-list-item-icon>
      </Host>
    )
  }
}
