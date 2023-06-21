import { h } from '@stencil/core'
import { NavLinkItem } from './bal-nav-link-item'
import { NavMenuLinkItem } from './bal-nav-menu-link-item'
import { NavLinkItemObserver } from '../bal-nav.types'

export class NavMetaLinkItem extends NavLinkItem implements BalProps.BalNavMetaLinkItem {
  mainLinkItems: NavMenuLinkItem[] = []

  constructor(item: BalProps.BalNavMetaLinkItem, observer: NavLinkItemObserver) {
    super(item, observer)
    this.value = item.value || `nav-meta-link-item-${NavMetaLinkItemIDs++}`
    this.mainLinkItems = (item.mainLinkItems || []).map(item => new NavMenuLinkItem(item, observer))
  }

  override render() {
    if (this.isLink) {
      return <bal-tab-item label={this.label} value={this.value} href={this.href} target={this.target}></bal-tab-item>
    }

    return (
      <bal-tab-item
        label={this.label}
        value={this.value}
        onBalNavigate={ev => {
          if (this.onClick) {
            this.onClick(ev.detail)
          }
        }}
      ></bal-tab-item>
    )
  }
}

let NavMetaLinkItemIDs = 0

/*
<bal-tabs spaceless inverted context="meta" value={this.selectedMetaValue}>
{this.levels.map((meta, index) => {
  return meta.isTabLink ? (
    <bal-tab-item
      label={meta.label}
      value={meta.value}
      href={meta.link}
      target={meta.target}
      {...meta.trackingData}
    />
  ) : (
    <bal-tab-item
      label={meta.label}
      value={meta.value}
      {...meta.trackingData}
      onBalNavigate={ev => {
        meta.onClick(ev.detail)
        this.selectedMetaValue = meta.value
        this.selectedMetaIndex = index
        this.isMainBodyOpen = false
        this.selectedMainValue = ''
      }}
    />
  )
})}
*/
