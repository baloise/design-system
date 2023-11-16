import { h } from '@stencil/core'
import { NavLinkItem } from './bal-nav-link-item'
import { NavMenuLinkItem } from './bal-nav-menu-link-item'
import { NavLinkItemObserver } from '../bal-nav.types'
import { AccordionButton } from '../components/accordion-button'
import { OverviewLink } from '../components/overview-link'
import { BEM } from '../../../utils/bem'

export class NavMetaLinkItem extends NavLinkItem implements BalProps.BalNavMetaLinkItem {
  mainLinkItems: NavMenuLinkItem[] = []
  overviewLink?: NavLinkItem

  constructor(item: BalProps.BalNavMetaLinkItem, observer: NavLinkItemObserver) {
    super(item, observer)
    this.id = `nav-meta-link-item-${NavMetaLinkItemIDs++}`
    this.value = item.value || this.id
    this.mainLinkItems = (item.mainLinkItems || []).map(item => new NavMenuLinkItem(item, observer))
    this.overviewLink = item.overviewLink ? new NavLinkItem(item.overviewLink, observer) : undefined
  }

  get type(): string {
    return 'NavMetaLinkItem'
  }

  override renderTouch(
    context?: Partial<{ onClick: () => void; activeMetaLinkValue: string; activeMenuLinkValue: string }>,
  ) {
    const block = BEM.block('nav')

    const isSelected = context?.activeMetaLinkValue === this.value

    return (
      <li>
        <AccordionButton
          id={this.id}
          level="meta"
          label={this.label}
          open={isSelected}
          link={this.isLink}
          href={this.href}
          target={this.target}
          onClick={ev => this.onAccordionClick(ev)}
        ></AccordionButton>
        {isSelected ? <OverviewLink item={this.overviewLink} onClick={ev => this.onClick(ev)}></OverviewLink> : ''}
        {isSelected ? (
          <hr
            class={{
              ...block.element('line').class(),
              ...block.element('line').modifier('up').class(),
            }}
          />
        ) : (
          ''
        )}
        {isSelected && this.mainLinkItems && this.mainLinkItems.length > 0 ? (
          <ul
            class={{
              ...block.element('mobile-menu-list').class(),
            }}
          >
            {this.mainLinkItems.map(item =>
              item.renderTouch({
                activeMetaLinkValue: context.activeMetaLinkValue,
                activeMenuLinkValue: context.activeMenuLinkValue,
              }),
            )}
          </ul>
        ) : (
          ''
        )}
        <hr
          class={{
            ...block.element('line').class(),
          }}
        />
      </li>
    )
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
