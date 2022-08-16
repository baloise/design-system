import { FunctionalComponent, h } from '@stencil/core'
import { isPlatform } from '../../..'
import { BEM } from '../../../utils/bem'
import { TabProps } from '../bal-tab.type'

const stepsEl = BEM.block('tabs').element('steps')
const stepItemEl = stepsEl.element('item')
const stepItemButtonEl = stepItemEl.element('button')
const stepItemButtonIndexEl = stepItemButtonEl.element('index')
const stepItemButtonIndexLabelEl = stepItemButtonIndexEl.element('label')
const stepItemButtonLabelEl = stepItemButtonEl.element('label')

export const StepList: FunctionalComponent<TabProps> = ({ value, float, clickable, tabs, onSelectTab }) => {
  let hasPassed = true
  tabs = tabs
    .map(tab => ({ ...tab, active: tab.value === value }))
    .map(tab => {
      if (tab.active) {
        hasPassed = false
      }
      return { ...tab, passed: hasPassed }
    })

  return (
    <ul
      class={{
        ...stepsEl.class(),
        ...stepsEl.modifier(`float-${float}`).class(),
      }}
    >
      {tabs.map((tab, index) => (
        <li
          class={{
            ...stepItemEl.class(),
            ...stepItemEl.modifier('hidden').class(tab.hidden),
            ...stepItemEl.modifier('active').class(tab.active),
            ...stepItemEl.modifier('passed').class(tab.passed),
            ...stepItemEl.modifier('disabled').class(tab.disabled),
            ...stepItemEl.modifier('done').class(tab.done),
            ...stepItemEl.modifier('failed').class(tab.failed),
            ...stepItemEl.modifier('clickable').class(clickable && !tab.disabled),
            'data-test-tab-item': true,
          }}
          data-label={tab.label}
          data-value={tab.value}
          data-index={index}
        >
          <a
            class={{
              ...stepItemButtonEl.class(),
              ...stepItemButtonEl.modifier('disabled').class(tab.disabled),
              ...stepItemButtonEl.modifier('clickable').class(clickable && !tab.disabled),
            }}
            onClick={(event: MouseEvent) => onSelectTab(event, tab)}
          >
            <span
              class={{
                ...stepItemButtonIndexEl.class(),
                ...stepItemButtonIndexEl.modifier('done').class(tab.done),
                ...stepItemButtonIndexEl.modifier('active').class(tab.active),
                ...stepItemButtonIndexEl.modifier('failed').class(tab.failed),
                ...stepItemButtonIndexEl.modifier('disabled').class(tab.disabled),
              }}
            >
              <bal-icon
                class={{
                  ...stepItemButtonIndexEl.element('icon').class(),
                }}
                style={{ display: tab.done ? 'block' : 'none' }}
                size={isPlatform('mobile') ? 'xsmall' : 'small'}
                color="white"
                name="check"
              ></bal-icon>
              <span
                class={{
                  ...stepItemButtonIndexLabelEl.class(),
                  ...stepItemButtonIndexLabelEl.modifier('failed').class(tab.failed),
                  ...stepItemButtonIndexLabelEl.modifier('active').class(tab.active),
                  ...stepItemButtonIndexLabelEl.modifier('disabled').class(tab.disabled),
                }}
                style={{ display: !tab.done ? 'block' : 'none' }}
              >
                {tab.failed ? '!' : index + 1}
              </span>
            </span>
            <span
              class={{
                ...stepItemButtonLabelEl.class(),
                ...stepItemButtonLabelEl.modifier('done').class(tab.done),
                ...stepItemButtonLabelEl.modifier('active').class(tab.active),
                ...stepItemButtonLabelEl.modifier('failed').class(tab.failed),
                ...stepItemButtonLabelEl.modifier('disabled').class(tab.disabled),
              }}
            >
              {tab.label}
            </span>
          </a>
        </li>
      ))}
    </ul>
  )
}
