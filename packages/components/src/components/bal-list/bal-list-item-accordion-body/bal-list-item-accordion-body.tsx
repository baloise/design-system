import { Component, Host, h, Prop, Element, State, Listen } from '@stencil/core'

@Component({
  tag: 'bal-list-item-accordion-body',
  scoped: false,
  shadow: false,
})
export class ListItemAccordionBody {
  @Element() el!: HTMLElement

  @State() contentHeight = '0px'

  /**
   * If `true` the body will be open and visible
   */
  @Prop() open = false

  @Listen('resize', { target: 'window' })
  async resizeHandler() {
    this.calcContentHeight()
  }

  componentDidRender() {
    this.calcContentHeight()
  }

  calcContentHeight() {
    const inner = this.el.querySelector('bal-list-item-content')
    if (inner) {
      this.contentHeight = inner.scrollHeight + 'px'
      const parent = this.el.closest('.bal-list__item__accordion-body__parent') as HTMLBalListItemAccordionBodyElement
      const parentHeight = parent ? parent.scrollHeight : 0
      const parentIsThereAndIsOpen = parent && parentHeight > 0 && parent.open
      if (parentIsThereAndIsOpen && this.open) {
        parent.style.maxHeight = parentHeight + inner.scrollHeight + 'px'
      }
    }
  }

  render() {
    return (
      <Host
        class={{
          'bal-list__item': true,
          'bal-list__item__accordion-body': true,
          'bal-list__item__accordion-body--open': this.open,
        }}
        style={{ maxHeight: this.open ? this.contentHeight : '0' }}
      >
        <bal-list-item-content>
          <slot></slot>
        </bal-list-item-content>
      </Host>
    )
  }
}
