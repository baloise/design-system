import { h } from '@stencil/core'
import { NavLinkItem } from './bal-nav-link-item'
import { NavLinkItemObserver } from '../bal-nav.types'
import { BEM } from '../../../utils/bem'

export class NavServiceLinkItem extends NavLinkItem implements BalProps.BalNavServiceLinkItem {
  color: 'grey' | 'purple' | 'yellow' | 'red' | 'green' = 'grey'
  linkItems: NavLinkItem[] = []

  constructor(item: BalProps.BalNavServiceLinkItem, observer: NavLinkItemObserver) {
    super(item, observer)
    this.id = `nav-service-link-item-${NavServiceLinkItemIDs++}`
    this.value = item.value || this.id
    this.color = item.color || 'grey'
    this.linkItems = (item.linkItems || []).map(item => new NavLinkItem(item, observer))
  }

  override renderTouch(
    _context?: Partial<{ onClick: () => void; activeMetaLinkValue: string; activeMenuLinkValue: string }>,
  ) {
    const block = BEM.block('nav')

    const hasItems = this.linkItems && this.linkItems.length > 0

    return (
      <li>
        <a
          id={this.id}
          class={{
            ...block.element('mobile-service-item').class(),
            ...block.element('mobile-service-item').modifier('selected').class(this.active),
            ...block.element('mobile-service-item').modifier('clickable').class(this.clickable),
          }}
          href={this.href}
          target={this.target}
          onClick={ev => this.onClick(ev)}
        >
          {this.label}
        </a>
        {hasItems ? (
          <ul
            class={{
              ...block.element('mobile-links-list').class(),
            }}
          >
            {this.linkItems.map(item => item.renderTouch())}
          </ul>
        ) : (
          ''
        )}
      </li>
    )
  }

  override render(_context?: { onClick: () => void }) {
    return (
      <bal-nav-link-group color={this.color as any} role="list">
        <bal-nav-link
          role="listitem"
          variant="title"
          href={this.href}
          target={this.target}
          selected={this.active}
          onClick={ev => this.onClick(ev)}
        >
          {this.label}
        </bal-nav-link>
        {this.linkItems.map(item => item.render())}
      </bal-nav-link-group>
    )
  }
}

let NavServiceLinkItemIDs = 0
