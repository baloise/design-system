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

  @Listen('balAccordionChange', { target: 'window' })
  async listenToAccordionChanges() {
    this.calcContentHeight()
  }

  componentDidRender() {
    this.calcContentHeight()
  }

  calcContentHeight() {
    const inner = this.el.querySelector('.inner')
    if (inner) {
      this.contentHeight = inner.scrollHeight + 'px'
      //this.contentHeight = '100%'
      const parent = this.el.closest('.parent') as HTMLElement
      const parentHeight = parent ? parent.scrollHeight : 0
      const parentIsThereAndIsOpen = parent && parentHeight > 0 && parent.classList.contains('is-open')
      const childIsOpen = this.el.classList.contains('is-open')
      if (parentIsThereAndIsOpen && childIsOpen) {
        parent.style.maxHeight = parentHeight + inner.scrollHeight + 'px'
      }
    }
  }

  render() {
    return (
      <Host
        class={{
          'bal-list-item-accordion-body bal-list-item': true,
          'is-open': this.open,
        }}
        style={{ maxHeight: this.open ? this.contentHeight : '0' }}
        //style={{ height: this.open ? this.contentHeight : '0', maxHeight: this.open ? 'inherit' : '0' }}
      >
        <bal-list-item-content class="inner">
          <slot></slot>
        </bal-list-item-content>
      </Host>
    )
  }
}
