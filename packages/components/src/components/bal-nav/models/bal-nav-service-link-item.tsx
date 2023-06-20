import { h } from '@stencil/core'
import { NavLinkItem } from './bal-nav-link-item'
import { NavLinkItemObserver } from '../bal-nav.types'

export class NavServiceLinkItem extends NavLinkItem implements BalProps.BalNavServiceLinkItem {
  color: 'grey' | 'purple' | 'yellow' | 'red' | 'green' = 'grey'
  linkItems: BalProps.BalNavLinkItem[] = []

  constructor(item: BalProps.BalNavServiceLinkItem, observer: NavLinkItemObserver) {
    super(item, observer)
    this.value = item.value || `nav-service-link-item-${NavServiceLinkItemIDs++}`
    this.color = item.color || 'grey'
    this.linkItems = (item.linkItems || []).map(item => new NavLinkItem(item, observer))
  }

  override render(_context?: { onClick: () => void }) {
    return (
      <bal-nav-link-group color={this.color as any} role="list">
        <bal-nav-link role="listitem" variant="title" href={this.href} target={this.target}>
          {this.label}
        </bal-nav-link>
        {this.linkItems.map(item => item.render())}
      </bal-nav-link-group>
    )
  }
}

let NavServiceLinkItemIDs = 0
