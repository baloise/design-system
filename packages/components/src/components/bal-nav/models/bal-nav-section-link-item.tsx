import { NavLinkItem, NavLinkItemObserver } from './bal-nav-link-item'

export class NavSectionLinkItem extends NavLinkItem implements BalProps.BalNavSectionLinkItem {
  linkItems: BalProps.BalNavLinkItem[] = []

  constructor(item: BalProps.BalNavSectionLinkItem, observer: NavLinkItemObserver) {
    super(item, observer)
    this.value = item.value || `nav-section-link-item-${NavSectionLinkItemIDs++}`
    this.linkItems = (item.linkItems || []).map(item => new NavLinkItem(item, observer))
  }
}

let NavSectionLinkItemIDs = 0
