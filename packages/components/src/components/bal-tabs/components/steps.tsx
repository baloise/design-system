import { FunctionalComponent, h } from '@stencil/core'
import { BalTabOption, TabProps } from '../bal-tab.type'

const stepIndex = (tab: BalTabOption, index: number): string => {
  if (tab.failed) {
    return '!'
  }
  if (tab.done) {
    return ''
  }
  return <span style={{ marginTop: '-2px' }}>{index + 1}</span>
}

export const StepList: FunctionalComponent<TabProps> = ({ value, tabs, onSelectTab }) => (
  <div class={['tabs is-fullwidth'].join(' ')}>
    <ul>
      {tabs.map((tab, index) => (
        <li
          class={{
            'is-active': tab.value === value,
            'is-disabled': tab.disabled,
            'is-done': tab.done,
            'is-hidden': tab.hidden,
            'is-failed': tab.failed,
            'data-test-tab-item': true,
          }}
          data-label={tab.label}
          data-value={tab.value}
          data-index={index}
        >
          <a onClick={(event: MouseEvent) => onSelectTab(event, tab)}>
            <span class="step-index">{stepIndex(tab, index)}</span>
            <span class="step-label">{tab.label}</span>
          </a>
          <span class="bubble" style={{ display: tab.hasBubble ? 'inline' : 'none' }}></span>
        </li>
      ))}
    </ul>
  </div>
)
