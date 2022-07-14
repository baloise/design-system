import { Component, Host, h, Element } from '@stencil/core'
import { Props } from '../../../props'
import BalHeadingLevel = Props.BalHeadingLevel

@Component({
  tag: 'bal-list-item-title',
  scoped: false,
  shadow: false,
})
export class ListItemTitle {
  @Element() el!: HTMLElement
  private isInMainNav?: boolean = false
  private isSubAccordionItem?: boolean = false
  private headingLevel?: BalHeadingLevel

  connectedCallback() {
    this.isInMainNav = this.el.closest('bal-list')?.mainNavAccordion
    this.isSubAccordionItem = this.el.closest('bal-list-item')?.subAccordionItem
    if (this.isInMainNav) {
      this.headingLevel = this.isSubAccordionItem ? 'h5' : 'h4'
    }
  }
  render() {
    return (
      <Host class="bal-list-item-title">
        <bal-heading level={this.headingLevel ?? 'h5'} space="none">
          <slot></slot>
        </bal-heading>
      </Host>
    )
  }
}
