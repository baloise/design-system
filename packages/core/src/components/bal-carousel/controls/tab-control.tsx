import { FunctionalComponent, h } from '@stencil/core'
import { BEM } from '../../../utils/bem'
import { ariaBooleanToString } from 'packages/core/src/utils/aria'
import { toKebabCase } from 'packages/core/src/utils/string'

export interface TabControlItem {
  label: string
  value: number
}

export interface TabControlProps {
  value: number
  items: TabControlItem[]
  containerId: string
  onControlChange: (item: TabControlItem) => void
}

export const TabControl: FunctionalComponent<TabControlProps> = ({ value, items, containerId, onControlChange }) => {
  const block = BEM.block('carousel')
  const controls = block.element('controls')

  return (
    <div
      class={{
        ...controls.class(),
        ...controls.modifier('tabs').class(),
      }}
    >
      <bal-card>
        <bal-card-content role="tabs">
          {items.map(item => (
            <button
              class={{
                'button': true,
                'is-fullwidth': true,
                'is-primary': value === item.value,
                'is-light': value !== item.value,
              }}
              role="tab"
              aria-selected={ariaBooleanToString(value === item.value)}
              aria-controls={containerId + '-' + toKebabCase(item.label)}
              key={item.value}
              onClick={() => onControlChange(item)}
            >
              {item.label}
            </button>
          ))}
        </bal-card-content>
      </bal-card>
    </div>
  )
}
