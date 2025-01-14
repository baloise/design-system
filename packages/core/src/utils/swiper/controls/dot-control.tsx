import { FunctionalComponent, h } from '@stencil/core'
import { BEM } from '../../../utils/bem'

export interface DotControlItem {
  value: number
}

export interface DotControlProps {
  value: number
  items: DotControlItem[]
  containerId: string
  onControlChange: (item: DotControlItem) => void
}

export const DotControl: FunctionalComponent<DotControlProps> = ({ value, items, containerId, onControlChange }) => {
  const block = BEM.block('swiper')
  const controls = block.element('controls')

  const onChange = (ev: BalEvents.BalPaginationChange) => {
    let selectedValue = ev.detail - 1

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
        ...controls.modifier('dots').class(),
      }}
    >
      <bal-pagination
        aria-controls={containerId}
        interface="small"
        value={value + 1}
        totalPages={items.length}
        onBalChange={onChange}
      ></bal-pagination>
    </div>
  )
}
