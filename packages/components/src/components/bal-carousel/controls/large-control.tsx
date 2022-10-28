import { FunctionalComponent, h } from '@stencil/core'
import { BEM } from '../../../utils/bem'

export interface LargeControlProps {
  isFirst: boolean
  isLast: boolean
  onPreviousClick: () => void
  onNextClick: () => void
}

export const LargeControl: FunctionalComponent<LargeControlProps> = ({
  isFirst,
  isLast,
  onNextClick,
  onPreviousClick,
}) => {
  const block = BEM.block('carousel')
  const controls = block.element('controls')
  const button = controls.element('button')

  return (
    <div
      class={{
        ...controls.class(),
        ...controls.modifier('large').class(),
      }}
    >
      <bal-button
        class={{ ...button.class(), ...button.modifier('left').class() }}
        square
        icon="nav-go-left"
        rounded
        onClick={() => onPreviousClick()}
        disabled={isFirst}
      ></bal-button>
      <bal-button
        class={{ ...button.class(), ...button.modifier('right').class() }}
        square
        icon="nav-go-right"
        rounded
        onClick={() => onNextClick()}
        disabled={isLast}
      ></bal-button>
    </div>
  )
}
