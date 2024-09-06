import { FunctionalComponent, h } from '@stencil/core'
import { BEM } from '../../../utils/bem'

export interface SmallControlProps {
  isFirst: boolean
  isLast: boolean
  inverted: boolean
  leftControlTitle: string
  rightControlTitle: string
  containerId: string
  onPreviousClick: () => void
  onNextClick: () => void
}

export const SmallControl: FunctionalComponent<SmallControlProps> = ({
  isFirst,
  isLast,
  inverted,
  leftControlTitle,
  rightControlTitle,
  containerId,
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
        aria-controls={containerId}
        square
        size="small"
        icon="nav-go-left"
        rounded
        inverted={inverted}
        onClick={() => onPreviousClick()}
        disabled={isFirst}
        aria-hidden={isFirst ? 'true' : null}
        tabindex="-1"
        data-testid="bal-carousel-control-left"
        title={leftControlTitle}
      ></bal-button>
      <bal-button
        class={{
          ...button.class(),
          ...button.modifier('right').class(),
          ...button.modifier('hidden').class(isLast),
        }}
        aria-controls={containerId}
        square
        size="small"
        icon="nav-go-right"
        rounded
        inverted={inverted}
        onClick={() => onNextClick()}
        disabled={isLast}
        aria-hidden={isLast ? 'true' : null}
        tabindex="-1"
        data-testid="bal-carousel-control-right"
        title={rightControlTitle}
      ></bal-button>
    </div>
  )
}
