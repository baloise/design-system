import { FunctionalComponent, h } from '@stencil/core'
import { BEM } from '../../../utils/bem'
import { NavSectionLinkItem } from '../models/bal-nav-section-link-item'

export interface SectionListProps {
  items: NavSectionLinkItem[]
}

export const SectionList: FunctionalComponent<SectionListProps> = ({ items }) => {
  const block = BEM.block('nav')

  const hasNoItems = !(items && items.length > 0)

  if (hasNoItems) {
    return ''
  }

  return (
    <ul
      class={{
        ...block.element('mobile-section-list').class(),
      }}
    >
      {items?.map(itemGroup => {
        return (
          <li key={itemGroup.href}>
            <a
              class={{
                ...block.element('mobile-section-item').class(),
              }}
              href={itemGroup.href}
              target={itemGroup.target}
            >
              {itemGroup.label}
            </a>
            {itemGroup.linkItems && itemGroup.linkItems.length > 0 ? (
              <ul
                class={{
                  ...block.element('mobile-links-list').class(),
                }}
              >
                {itemGroup.linkItems?.map(item => {
                  return (
                    <li key={item.href}>
                      <a
                        class={{
                          ...block.element('mobile-links').class(),
                        }}
                        href={item.href}
                        target={item.target}
                      >
                        {item.label}
                      </a>
                    </li>
                  )
                })}
              </ul>
            ) : (
              ''
            )}
          </li>
        )
      })}
    </ul>
  )
}
