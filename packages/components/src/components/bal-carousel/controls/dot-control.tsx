import { FunctionalComponent, h } from '@stencil/core'
import { BEM } from '../../../utils-new/bem'

export interface DotControlItem {
  value: number
}

export interface DotControlProps {
  value: number
  items: DotControlItem[]
  onControlChange: (item: DotControlItem) => void
}

export const DotControl: FunctionalComponent<DotControlProps> = ({ value, items, onControlChange }) => {
  const block = BEM.block('carousel')
  const controls = block.element('controls')

  const onChange = (event: BalEvents.BalPaginationChange) => {
    let selectedValue = event.detail - 1

    if (selectedValue < 0) {
      selectedValue = 0
    }

    if (selectedValue >= items.length) {
      selectedValue = items.length - 1
    }

    onControlChange(items[selectedValue])
  }

  return (
    <div
      class={{
        ...controls.class(),
        ...controls.modifier('tabs').class(),
      }}
    >
      <bal-pagination
        interface="small"
        value={value + 1}
        totalPages={items.length}
        onBalChange={onChange}
      ></bal-pagination>
    </div>
  )
}
