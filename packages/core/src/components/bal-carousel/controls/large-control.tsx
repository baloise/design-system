import { FunctionalComponent, h } from '@stencil/core'
import { BEM } from '../../../utils/bem'

export interface LargeControlProps {
  isFirst: boolean
  isLast: boolean
  inverted: boolean
  areControlsHidden: boolean
  leftControlTitle: string
  rightControlTitle: string
  containerId: string
  onPreviousClick: () => void
  onNextClick: () => void
}

export const LargeControl: FunctionalComponent<LargeControlProps> = ({
  isFirst,
  isLast,
  inverted,
  areControlsHidden,
  onNextClick,
  onPreviousClick,
  containerId,
  leftControlTitle,
  rightControlTitle,
}) => {
  const block = BEM.block('carousel')
  const controls = block.element('controls')
  const button = controls.element('button')

  return (
    <div
      data-mutation="false"
      class={{
        ...controls.class(),
        ...controls.modifier('large').class(),
      }}
    >
      <bal-button
        class={{
          ...button.class(),
          ...button.modifier('left').class(),
          ...button.modifier('hidden').class(isFirst && areControlsHidden),
        }}
        aria-controls={containerId}
        square
        icon="nav-go-left"
        rounded
        inverted={inverted}
        onClick={() => onPreviousClick()}
        disabled={isFirst}
        aria-hidden={isFirst && areControlsHidden ? 'true' : null}
        data-testid="bal-carousel-control-left"
        title={leftControlTitle}
      ></bal-button>
      <bal-button
        class={{
          ...button.class(),
          ...button.modifier('right').class(),
          ...button.modifier('hidden').class(isLast && areControlsHidden),
        }}
        aria-controls={containerId}
        square
        icon="nav-go-right"
        rounded
        inverted={inverted}
        onClick={() => onNextClick()}
        disabled={isLast}
        aria-hidden={isLast && areControlsHidden ? 'true' : null}
        data-testid="bal-carousel-control-right"
        title={rightControlTitle}
      ></bal-button>
    </div>
  )
}
