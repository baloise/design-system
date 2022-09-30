import { Component, Host, h, Prop, Element, State, Listen, Method } from '@stencil/core'

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

  /**
   * Synchronizes the height of the accordion to max of all
   * the other grouped accordion bodies
   */
  @Prop() accordionGroup?: string

  @Listen('resize', { target: 'window' })
  async resizeHandler() {
    this.calcContentHeight()
  }

  componentDidRender() {
    this.calcContentHeight()
  }

  @Method()
  async getContentHeight() {
    const inner = this.el.querySelector('bal-list-item-content')

    if (inner) {
      return inner.scrollHeight
    }
    return 0
  }

  getAccordionGroupItems() {
    return Array.from(document.body.querySelectorAll('bal-list-item-accordion-body')).filter(
      accordionBody => accordionBody.accordionGroup === this.accordionGroup,
    )
  }

  setContentHeight(height: number) {
    this.contentHeight = height + 'px'
    const parent = this.el.closest('.bal-list__item__accordion-body__parent') as HTMLBalListItemAccordionBodyElement
    const parentHeight = parent ? parent.scrollHeight : 0
    const parentIsThereAndIsOpen = parent && parentHeight > 0 && parent.open
    if (parentIsThereAndIsOpen && this.open) {
      parent.style.maxHeight = parentHeight + height + 'px'
    }
  }

  get areWeInAGroup() {
    return this.accordionGroup !== '' && this.accordionGroup !== undefined
  }

  async calcContentHeight() {
    let height = await this.getContentHeight()

    if (this.areWeInAGroup) {
      const items = this.getAccordionGroupItems()
      const heights = []
      for (let index = 0; index < items.length; index++) {
        const element = items[index] as any
        heights.push(await element.getContentHeight())
      }
      const maxHeight = Math.max(...heights)
      height = maxHeight
    }

    this.setContentHeight(height)
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
        <bal-list-item-content style={{ minHeight: this.areWeInAGroup ? this.contentHeight : 'inherit' }}>
          <slot></slot>
        </bal-list-item-content>
      </Host>
    )
  }
}
