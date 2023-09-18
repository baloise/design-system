/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../interfaces.d.ts" />

namespace BalProps {
  export type BalNavContainer = 'default' | 'fluid' | 'compact'
  export type BalNavMetaButtons = BalNavMetaButton[]
  export type BalNavOptions = BalNavMetaLinkItem[]

  export interface BalNavMetaButton extends BalNavLinkItem {
    touchPlacement?: 'top' | 'bottom' | 'none'
    icon?: string
    popupId?: string
  }

  export interface BalNavMetaLinkItem extends BalNavLinkItem {
    overviewLink?: BalNavLinkItem
    mainLinkItems?: BalNavMenuLinkItem[]
  }

  export interface BalNavMenuLinkItem extends BalNavLinkItem {
    render(context?: { onClick: () => void }): any
    overviewLink?: BalNavLinkItem
    sectionLinkItems?: BalNavSectionLinkItem[]
    serviceLinkItems?: BalNavServiceLinkItem[]
  }

  export interface BalNavSectionLinkItem extends BalNavLinkItem {
    linkItems?: BalNavLinkItem[]
  }

  export interface BalNavServiceLinkItem extends BalNavLinkItem {
    color?: 'grey' | 'purple' | 'yellow' | 'red' | 'green'
    linkItems?: BalNavLinkItem[]
  }

  export interface BalNavLogoLink {
    htmlTitle?: string
    ariaLabel?: string
    href?: string
    target?: BalProps.BalButtonTarget
    clickable?: boolean
    onClick?: (ev: MouseEvent) => void
  }

  export interface BalNavLinkItem {
    label: string
    value?: string
    active?: boolean
    htmlTitle?: string
    ariaLabel?: string
    href?: string
    target?: BalProps.BalButtonTarget
    clickable?: boolean
    data?: any
    onClick?: (ev: MouseEvent) => void
    onAccordionClick: (ev: MouseEvent) => void
  }
}

namespace BalEvents {
  export interface BalNavCustomEvent<T> extends CustomEvent<T> {
    detail: T
    target: HTMLBalNavElement
  }

  export interface BalNavClickedItem {
    label: string
    value?: string
    href?: string
    data?: any
    target?: BalProps.BalButtonTarget
  }

  export type BalNavItemClickDetail = BalNavClickedItem
  export type BalNavItemClick = BalInputCustomEvent<BalNavItemClickDetail>
}
