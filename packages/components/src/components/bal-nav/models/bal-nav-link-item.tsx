import { h } from '@stencil/core'
import { NavLinkItemObserver } from '../bal-nav.types'

export class NavLinkItem implements BalProps.BalNavLinkItem {
  label: string
  value: string
  clickable = false
  active = false
  data = undefined

  href?: string
  target?: BalProps.BalButtonTarget
  onClick: (ev: MouseEvent) => void

  constructor(item: BalProps.BalNavLinkItem, private observer: NavLinkItemObserver) {
    this.label = item.label
    this.value = item.value || `nav-link-item-${NavLinkItemIDs++}`
    this.href = item.href
    this.target = item.target
    this.active = !!item.active
    this.clickable = !!item.clickable
    this.data = item.data

    this.onClick = (ev: MouseEvent) => {
      this.observer.linkItemClickListener(this)
      if (item.onClick) {
        item.onClick(ev)
      }
    }
  }

  get isLink(): boolean {
    return this.href !== undefined && this.href !== null && this.href !== ''
  }

  get type(): string {
    return this.constructor.name
  }

  toJson(): BalEvents.BalNavClickedItem {
    return {
      label: this.label,
      value: this.value,
      href: this.href,
      target: this.target,
      data: this.data,
    }
  }

  render(_context?: { onClick: () => void }) {
    return (
      <bal-nav-link
        role="listitem"
        href={this.href}
        target={this.target}
        clickable={this.clickable}
        selected={this.active}
        onClick={ev => this.onClick(ev)}
      >
        {this.label}
      </bal-nav-link>
    )
  }
}

let NavLinkItemIDs = 0
