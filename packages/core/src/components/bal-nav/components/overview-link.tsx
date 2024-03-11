import { FunctionalComponent, h } from '@stencil/core'
import { BEM } from '../../../utils/bem'
import { NavLinkItem } from '../models/bal-nav-link-item'

export interface OverviewLinkProps {
  item: NavLinkItem | undefined
  isMenu?: boolean
  isVisible?: boolean
  onClick: (ev: MouseEvent) => void
}

export const OverviewLink: FunctionalComponent<OverviewLinkProps> = ({ item, isMenu, onClick, isVisible }) => {
  const block = BEM.block('nav')

  if (!item) {
    return ''
  }

  return (
    <a
      class={{
        ...block.element('mobile-overview-link').class(),
        ...block.element('mobile-overview-link').modifier('menu').class(!!isMenu),
        ...block
          .element('mobile-overview-link')
          .modifier('invisible')
          .class(isVisible === false),
      }}
      href={item.href}
      target={item.target}
      onClick={ev => onClick(ev)}
    >
      {item.label} {item.label ? '➞' : ''}
    </a>
  )
}
