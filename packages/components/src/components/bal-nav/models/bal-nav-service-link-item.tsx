import { NavLinkItem, NavLinkItemObserver } from './bal-nav-link-item'

export class NavServiceLinkItem extends NavLinkItem implements BalProps.BalNavServiceLinkItem {
  color: 'grey' | 'purple' | 'yellow' | 'red' | 'green' = 'grey'
  linkItems: BalProps.BalNavLinkItem[] = []

  constructor(item: BalProps.BalNavServiceLinkItem, observer: NavLinkItemObserver) {
    super(item, observer)
    this.value = item.value || `nav-service-link-item-${NavServiceLinkItemIDs++}`
    this.color = item.color || 'grey'
    this.linkItems = (item.linkItems || []).map(item => new NavLinkItem(item, observer))
  }
}

let NavServiceLinkItemIDs = 0
