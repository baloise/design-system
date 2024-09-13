import { FunctionalComponent, h } from '@stencil/core'
import { BEM } from '../../../utils/bem'
import { BalStepOption } from '../bal-step.type'
import { StepIcon } from './step-icon'
import { StepLabel } from './step-label'

export interface StepButtonProps {
  item: BalStepOption
  isMobile: boolean
  clickable: boolean
  color: BalProps.BalStepsColor
  onSelectTab: (ev: MouseEvent, item: BalStepOption) => void
}

export const StepButton: FunctionalComponent<StepButtonProps> = ({ item, color, isMobile, clickable, onSelectTab }) => {
  const bemEl = BEM.block('steps').element('nav').element('item')

  if (item.invisible) {
    return
  }

  return (
    <a
      role="tab"
      class={{
        ...bemEl.class(),
        ...bemEl.modifier(`color-${color}`).class(),
        ...bemEl.modifier('done').class(item.done),
        ...bemEl.modifier('active').class(item.active),
        ...bemEl.modifier('failed').class(item.failed),
        ...bemEl.modifier('disabled').class(item.disabled),
        ...bemEl.modifier('clickable').class(clickable),
        ...bemEl.modifier('passed').class(item.passed),
        'bal-focusable': !item.disabled && !item.invisible,
      }}
      data-label={item.label}
      data-value={item.value}
      data-index={item.index}
      data-testid="bal-steps-option"
      aria-disabled={`${item.disabled}`}
      href={item.href === '' ? 'javascript:;' : item.href}
      target={item.target}
      onClick={(ev: MouseEvent) => onSelectTab(ev, item)}
    >
      <StepIcon item={item} isMobile={isMobile}></StepIcon>
      <StepLabel item={item}></StepLabel>
    </a>
  )
}
