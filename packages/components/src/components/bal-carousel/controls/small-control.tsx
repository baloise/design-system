import { FunctionalComponent, h } from '@stencil/core'
import { BEM } from '../../../utils/bem'

export interface SmallControlProps {
  isFirst: boolean
  isLast: boolean
  inverted: boolean
  onPreviousClick: () => void
  onNextClick: () => void
}

export const SmallControl: FunctionalComponent<SmallControlProps> = ({
  isFirst,
  isLast,
  inverted,
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
        ...controls.modifier('small').class(),
      }}
    >
      <bal-button
        class={{
          ...button.class(),
          ...button.modifier('left').class(),
          ...button.modifier('hidden').class(isFirst),
        }}
        square
        size="small"
        icon="nav-go-left"
        rounded
        inverted={inverted}
        onClick={() => onPreviousClick()}
        disabled={isFirst}
        data-testid="bal-carousel-control-left"
      ></bal-button>
      <bal-button
        class={{
          ...button.class(),
          ...button.modifier('right').class(),
          ...button.modifier('hidden').class(isLast),
        }}
        square
        size="small"
        icon="nav-go-right"
        rounded
        inverted={inverted}
        onClick={() => onNextClick()}
        disabled={isLast}
        data-testid="bal-carousel-control-right"
      ></bal-button>
    </div>
  )
}
