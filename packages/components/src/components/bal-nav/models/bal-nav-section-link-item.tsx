import { h } from '@stencil/core'
import { NavLinkItem } from './bal-nav-link-item'
import { NavLinkItemObserver } from '../bal-nav.types'

export class NavSectionLinkItem extends NavLinkItem implements BalProps.BalNavSectionLinkItem {
  linkItems: NavLinkItem[] = []
  htmlTitle: string | undefined

  constructor(item: BalProps.BalNavSectionLinkItem, observer: NavLinkItemObserver) {
    super(item, observer)
    this.htmlTitle = item.htmlTitle
    this.label = item.label
    this.href = item.href
    this.target = item.target
    this.value = item.value || `nav-section-link-item-${NavSectionLinkItemIDs++}`
    this.linkItems = (item.linkItems || []).map(item => new NavLinkItem(item, observer))
  }

  override render(_context?: { onClick: () => void }) {
    return (
      <bal-nav-link-group role="list">
        <bal-nav-link role="listitem" variant="title" href={this.href} target={this.target} selected={this.active}>
          {this.label}
        </bal-nav-link>
        {this.linkItems.map(item => item.render())}
      </bal-nav-link-group>
    )
  }
}

let NavSectionLinkItemIDs = 0
