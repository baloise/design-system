import { h } from '@stencil/core'
import { NavLinkItemObserver } from '../bal-nav.types'
import { BEM } from '../../../utils/bem'

export class NavLinkItem implements BalProps.BalNavLinkItem {
  id: string
  label: string
  value: string
  clickable = false
  active = false
  data = undefined

  href?: string
  target?: BalProps.BalButtonTarget
  onClick: (ev: MouseEvent) => void
  onAccordionClick: (ev: MouseEvent) => void

  constructor(item: BalProps.BalNavLinkItem, private observer: NavLinkItemObserver) {
    this.label = item.label
    this.id = `nav-link-item-${NavLinkItemIDs++}`
    this.value = item.value || this.id
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

    this.onAccordionClick = (ev: MouseEvent) => {
      this.observer.accordionClickListener(this)
      if (item.onAccordionClick) {
        item.onAccordionClick(ev)
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

  renderTouch(_context?: Partial<{ onClick: () => void; activeMetaLinkValue: string; activeMenuLinkValue: string }>) {
    const block = BEM.block('nav')

    return (
      <li>
        <a
          id={this.id}
          class={{
            ...block.element('mobile-links').class(),
            ...block.element('mobile-links').modifier('selected').class(this.active),
            ...block.element('mobile-links').modifier('clickable').class(this.clickable),
          }}
          href={this.href}
          target={this.target}
          onClick={ev => this.onClick(ev)}
        >
          {this.label}
        </a>
      </li>
    )
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
