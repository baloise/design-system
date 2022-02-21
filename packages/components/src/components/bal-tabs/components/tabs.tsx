import { FunctionalComponent, h } from '@stencil/core'
import { TabProps } from '../bal-tab.type'
import { TabItem } from './tab-item'

export const TabList: FunctionalComponent<TabProps> = ({
  value,
  expanded,
  tabs,
  onSelectTab,
  action,
  actionLabel,
  onActionClick,
  lineWidth,
  lineOffsetLeft,
}) => (
  <div class={['tabs', expanded ? 'is-fullwidth' : ''].join(' ')}>
    <div class="selected-tab-line" style={{ left: `${lineOffsetLeft || 0}px`, width: `${lineWidth || 0}px` }}></div>
    <ul>
      {tabs.map((tab, index) => (
        <li
          class={{
            'is-active': tab.value === value,
            'is-disabled': tab.disabled,
            'data-test-tab-item': true,
          }}
          data-label={tab.label}
          data-value={tab.value}
          data-index={index}
        >
          <TabItem href={tab.href} label={tab.label} onSelectTab={e => onSelectTab(e, tab)}></TabItem>
          <bal-badge size="small" position="tabs" class={{ 'is-hidden': !tab.hasBubble }}></bal-badge>
        </li>
      ))}
      <li class="is-right" style={{ display: action ? 'block' : 'none' }}>
        <bal-button color="info" class="data-test-tabs-action" onClick={(event: MouseEvent) => onActionClick(event)}>
          {actionLabel}
        </bal-button>
      </li>
    </ul>
    <div class="line"></div>
  </div>
)
