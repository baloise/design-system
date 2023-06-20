import { h } from '@stencil/core'
import { NavLinkItemObserver } from '../bal-nav.types'
import { NavLinkItem } from './bal-nav-link-item'
import { NavSectionLinkItem } from './bal-nav-section-link-item'
import { NavServiceLinkItem } from './bal-nav-service-link-item'

export class NavMainLinkItem extends NavLinkItem implements BalProps.BalNavMainLinkItem {
  sectionLinkItems: BalProps.BalNavSectionLinkItem[] = []
  serviceLinkItems: BalProps.BalNavServiceLinkItem[] = []

  constructor(item: BalProps.BalNavMainLinkItem, observer: NavLinkItemObserver) {
    super(item, observer)
    this.value = item.value || `nav-main-link-item-${NavMainLinkItemIDs++}`
    this.sectionLinkItems = (item.sectionLinkItems || []).map(item => new NavSectionLinkItem(item, observer))
    this.serviceLinkItems = (item.serviceLinkItems || []).map(item => new NavServiceLinkItem(item, observer))
  }

  override render(context?: { onClick: () => void }) {
    if (this.isLink) {
      return <bal-tab-item label={this.label} value={this.value} href={this.href} target={this.target}></bal-tab-item>
    }

    return (
      <bal-tab-item
        label={this.label}
        value={this.value}
        onBalNavigate={ev => {
          context?.onClick()
          if (this.onClick) {
            this.onClick(ev.detail)
          }
        }}
      ></bal-tab-item>
    )
  }
}

let NavMainLinkItemIDs = 0
