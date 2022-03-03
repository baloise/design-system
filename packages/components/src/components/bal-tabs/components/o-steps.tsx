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
            'is-clickable': clickable && !tab.disabled,
            'data-test-tab-item': true,
          }}
          data-label={tab.label}
          data-value={tab.value}
          data-index={index}
        >
          <a onClick={(event: MouseEvent) => onSelectTab(event, tab)}>
            <span class="step-index">
              <bal-icon
                style={{ display: tab.done ? 'block' : 'none' }}
                name="check-circle"
                class="check-icon"
              ></bal-icon>
              <span style={{ display: !tab.done && !tab.failed ? 'block' : 'none' }} class="inner-text">
                {index + 1}
              </span>
            </span>
            <span class="step-label is-hidden-mobile">{tab.label}</span>
          </a>
        </li>
      ))}
    </ul>
  </div>
)
