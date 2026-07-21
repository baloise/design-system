import { FunctionalComponent, h } from '@stencil/core'
import { BEM } from '../../../utils/bem'
import { NavServiceLinkItem } from '../models/bal-nav-service-link-item'

export interface ServiceListProps {
  items: NavServiceLinkItem[]
}

export const ServiceList: FunctionalComponent<ServiceListProps> = ({ items }) => {
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
      {items?.map(serviceGroup => {
        return (
          <li key={serviceGroup.id}>
            <a
              class={{
                ...block.element('mobile-section-item').class(),
              }}
              href={serviceGroup.href}
              rel={serviceGroup.rel}
              target={serviceGroup.target}
            >
              {serviceGroup.label}
            </a>
            <ul
              class={{
                ...block.element('mobile-links-list').class(),
              }}
            >
              {serviceGroup.linkItems?.map(item => {
                return (
                  <li key={item.id}>
                    <a
                      class={{
                        ...block.element('mobile-links').class(),
                      }}
                      href={item.href}
                      rel={item.rel}
                      target={item.target}
                    >
                      {item.label}
                    </a>
                  </li>
                )
              })}
            </ul>
          </li>
        )
      })}
    </ul>
  )
}
