import { h } from '@stencil/core'
import { BEM } from '../../../utils/bem'
import { isTabKey } from '../../../utils/keyboard'
import { NavLinkItemObserver } from '../bal-nav.types'
import { AccordionButton } from '../components/accordion-button'
import { OverviewLink } from '../components/overview-link'
import { NavLinkItem } from './bal-nav-link-item'
import { NavSectionLinkItem } from './bal-nav-section-link-item'
import { NavServiceLinkItem } from './bal-nav-service-link-item'

export class NavMenuLinkItem extends NavLinkItem implements BalProps.BalNavMenuLinkItem {
  sectionLinkItems: NavSectionLinkItem[] = []
  serviceLinkItems: NavServiceLinkItem[] = []
  overviewLink?: NavLinkItem

  constructor(item: BalProps.BalNavMenuLinkItem, observer: NavLinkItemObserver) {
    super(item, observer)
    this.id = `nav-menu-link-item-${NavMenuLinkItemIDs++}`
    this.value = item.value || this.id
    this.sectionLinkItems = (item.sectionLinkItems || []).map(item => new NavSectionLinkItem(item, observer))
    this.serviceLinkItems = (item.serviceLinkItems || []).map(item => new NavServiceLinkItem(item, observer))
    this.overviewLink = item.overviewLink ? new NavLinkItem(item.overviewLink, observer) : undefined
  }

  get type(): string {
    return 'NavMenuLinkItem'
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
          id={this.id}
          level="menu"
          label={this.label}
          href={this.href}
          rel={this.rel}
          target={this.target}
          link={hasSectionLinkItems || hasServiceLinkItems ? false : this.isLink}
          open={isSelected}
          onClick={ev => this.onAccordionClick(ev)}
        ></AccordionButton>
        <OverviewLink
          item={this.overviewLink}
          onClick={ev => this.onClick(ev)}
          isMenu
          isVisible={isSelected}
        ></OverviewLink>
        {hasSectionLinkItems ? (
          <ul
            class={{
              ...block.element('mobile-section-list').class(),
              ...block
                .element('mobile-section-list')
                .modifier('invisible')
                .class(isSelected === false),
            }}
          >
            {this.sectionLinkItems.map(item => item.renderTouch())}
          </ul>
        ) : (
          ''
        )}
        {hasServiceLinkItems ? (
          <ul
            class={{
              ...block.element('mobile-service-list').class(),
              ...block
                .element('mobile-service-list')
                .modifier('invisible')
                .class(isSelected === false),
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

  override render(context?: { onClick: () => void; onTabPress: (ev: KeyboardEvent) => void; flyoutId: string }) {
    const hasChildren = this.sectionLinkItems.length > 0 || this.serviceLinkItems.length > 0
    if (!hasChildren && this.isLink) {
      return (
        <bal-tab-item
          aria={{ controls: context.flyoutId }}
          label={this.label}
          value={this.value}
          href={this.href}
          rel={this.rel}
          target={this.target}
          no-panel
        ></bal-tab-item>
      )
    }

    return (
      <bal-tab-item
        aria={{ controls: context.flyoutId }}
        label={this.label}
        value={this.value}
        no-panel
        onBalKeyDown={ev => isTabKey(ev.detail) && context?.onTabPress(ev.detail)}
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
