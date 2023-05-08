import { FunctionalComponent, h } from '@stencil/core'
import { BEM } from '@/components/utils/bem'
import { balBrowser } from '@/components/utils/browser'
import { BalTabOption } from '../bal-tab.type'

export interface TabSelectProps {
  items: BalTabOption[]
  value: string | undefined
  onSelectTab: (event: MouseEvent, tab: BalTabOption) => void
}

export const TabSelect: FunctionalComponent<TabSelectProps> = ({ items, value, onSelectTab }) => {
  const bemEl = BEM.block('tabs').element('select')

  const onChange = (event: CustomEvent<string | string[] | undefined>) => {
    const selectedTabs = items.filter(tab => tab.value === event.detail)
    if (selectedTabs.length > 0) {
      const selectedTab = selectedTabs[0]
      if (selectedTab.href !== '' && selectedTab.href !== undefined) {
        if (balBrowser.hasWindow) {
          window.open(selectedTab.href, selectedTab.target)
        }
      }
      onSelectTab(event as any, selectedTab)
    }
  }

  return (
    <bal-select class={{ ...bemEl.class() }} value={value} onBalChange={event => onChange(event)}>
      {items
        .filter(tab => !tab.disabled && !tab.hidden)
        .map(tab => (
          <bal-select-option label={tab.label} value={tab.value}>
            {tab.label}
          </bal-select-option>
        ))}
    </bal-select>
  )
}
