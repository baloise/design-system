import { FunctionalComponent, h } from '@stencil/core'
import { BEM } from '../../../utils/bem'
import { balBrowser } from '../../../utils/browser'
import { BalTabOption } from '../bal-tab.type'

export interface TabSelectProps {
  items: BalTabOption[]
  value: string | undefined
  onSelectTab: (ev: MouseEvent, tab: BalTabOption) => void
}

export const TabSelect: FunctionalComponent<TabSelectProps> = ({ items, value, onSelectTab }) => {
  const bemEl = BEM.block('tabs').element('select')

  const onChange = (ev: CustomEvent<string | string[] | undefined>) => {
    const selectedTabs = items.filter(tab => tab.value === ev.detail)
    if (selectedTabs.length > 0) {
      const selectedTab = selectedTabs[0]
      if (selectedTab.href !== '' && selectedTab.href !== undefined) {
        if (balBrowser.hasWindow) {
          window.open(selectedTab.href, selectedTab.target)
        }
      }
      onSelectTab(ev as any, selectedTab)
    }
  }

  return (
    <bal-select class={{ ...bemEl.class() }} value={value} onBalChange={event => onChange(event)}>
      {items
        .filter(tab => !tab.disabled && !tab.invisible)
        .map(tab => (
          <bal-select-option key={tab.value} label={tab.label} value={tab.value}>
            {tab.label}
          </bal-select-option>
        ))}
    </bal-select>
  )
}
