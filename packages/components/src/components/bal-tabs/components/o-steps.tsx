import { FunctionalComponent, h } from '@stencil/core'
import { TabProps } from '../bal-tab.type'

export const OStepList: FunctionalComponent<TabProps> = ({ value, clickable, tabs, onSelectTab }) => (
  <div>
    <ul>
      {tabs.map((tab, index) => (
        <li
          class={{
            'is-active': tab.value === value,
            'is-disabled': tab.disabled,
            'is-done': tab.done,
            'is-failed': tab.failed,
            'is-clickable': clickable,
            'data-test-tab-item': true,
          }}
          data-label={tab.label}
          data-value={tab.value}
          data-index={index}
        >
          <a onClick={(event: MouseEvent) => onSelectTab(event, tab)}>
            <span class="step-index">
              <span class="inner"></span>
            </span>
            <span class="step-label is-hidden-mobile">{tab.label}</span>
          </a>
        </li>
      ))}
    </ul>
  </div>
)
