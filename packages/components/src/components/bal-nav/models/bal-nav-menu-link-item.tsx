import { h } from '@stencil/core'
import { NavLinkItemObserver } from '../bal-nav.types'
import { NavLinkItem } from './bal-nav-link-item'
import { NavSectionLinkItem } from './bal-nav-section-link-item'
import { NavServiceLinkItem } from './bal-nav-service-link-item'
import { AccordionButton } from '../components/accordion-button'
import { OverviewLink } from '../components/overview-link'
import { BEM } from '../../../utils/bem'

export class NavMenuLinkItem extends NavLinkItem implements BalProps.BalNavMenuLinkItem {
  sectionLinkItems: NavSectionLinkItem[] = []
  serviceLinkItems: NavServiceLinkItem[] = []
  overviewLink?: NavLinkItem

  constructor(item: BalProps.BalNavMenuLinkItem, observer: NavLinkItemObserver) {
    super(item, observer)
    this.value = item.value || `nav-menu-link-item-${NavMenuLinkItemIDs++}`
    this.sectionLinkItems = (item.sectionLinkItems || []).map(item => new NavSectionLinkItem(item, observer))
    this.serviceLinkItems = (item.serviceLinkItems || []).map(item => new NavServiceLinkItem(item, observer))
    this.overviewLink = item.overviewLink ? new NavLinkItem(item.overviewLink, observer) : undefined
  }

  override renderTouch(
    context?: Partial<{ onClick: () => void; activeMetaLinkValue: string; activeMenuLinkValue: string }>,
  ) {
    const block = BEM.block('nav')

    const hasSectionLinkItems = this.sectionLinkItems && this.sectionLinkItems.length > 0
    const hasServiceLinkItems = this.serviceLinkItems && this.serviceLinkItems.length > 0
    const isSelected = context?.activeMenuLinkValue === this.value

    return (
      <li>
        <AccordionButton
          level="menu"
          label={this.label}
          open={isSelected}
          onClick={ev => this.onAccordionClick(ev)}
        ></AccordionButton>
        {isSelected ? (
          <OverviewLink item={this.overviewLink} onClick={ev => this.onClick(ev)} isMenu></OverviewLink>
        ) : (
          ''
        )}
        {isSelected && hasSectionLinkItems ? (
          <ul
            class={{
              ...block.element('mobile-section-list').class(),
            }}
          >
            {this.sectionLinkItems.map(item => item.renderTouch())}
          </ul>
        ) : (
          ''
        )}
        {isSelected && hasServiceLinkItems ? (
          <ul
            class={{
              ...block.element('mobile-service-list').class(),
            }}
          >
            {this.serviceLinkItems.map(item => item.renderTouch())}
          </ul>
        ) : (
          ''
        )}
      </li>
    )
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

let NavMenuLinkItemIDs = 0
