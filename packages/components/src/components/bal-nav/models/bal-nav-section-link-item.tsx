import { h } from '@stencil/core'
import { NavLinkItem } from './bal-nav-link-item'
import { NavLinkItemObserver } from '../bal-nav.types'
import { BEM } from '../../../utils/bem'

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

  override renderTouch(
    _context?: Partial<{ onClick: () => void; activeMetaLinkValue: string; activeMenuLinkValue: string }>,
  ) {
    const block = BEM.block('nav')

    const hasItems = this.linkItems && this.linkItems.length > 0

    return (
      <li>
        <a
          class={{
            ...block.element('mobile-section-item').class(),
            ...block.element('mobile-section-item').modifier('selected').class(this.active),
            ...block.element('mobile-section-item').modifier('clickable').class(this.clickable),
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
      <bal-nav-link-group role="list">
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

let NavSectionLinkItemIDs = 0
