import { FunctionalComponent, h } from '@stencil/core'
import { TabItemProps } from '../bal-tab.type'

export const TabItem: FunctionalComponent<TabItemProps> = ({ href, label, onSelectTab }) => {
  if (href) {
    return (
      <a href={href} aria-current="page" onClick={e => onSelectTab(e)}>
        {label}
      </a>
    )
  } else {
    return (
      <a aria-current="page" onClick={e => onSelectTab(e)}>
        {label}
      </a>
    )
  }
}
