import { FunctionalComponent, h } from '@stencil/core'
import { BEM } from '../../../utils/bem'
import { BalStepOption } from '../bal-step.type'
import { StepIcon } from './step-icon'
import { StepLabel } from './step-label'

export interface StepButtonProps {
  item: BalStepOption
  isMobile: boolean
  clickable: boolean
  onSelectTab: (event: MouseEvent, item: BalStepOption) => void
}

export const StepButton: FunctionalComponent<StepButtonProps> = ({ item, isMobile, clickable, onSelectTab }) => {
  const bemEl = BEM.block('steps').element('nav').element('item')

  if (item.hidden) {
    return
  }

  return (
    <a
      role="tab"
      class={{
        ...bemEl.class(),
        ...bemEl.modifier('done').class(item.done),
        ...bemEl.modifier('active').class(item.active),
        ...bemEl.modifier('failed').class(item.failed),
        ...bemEl.modifier('disabled').class(item.disabled),
        ...bemEl.modifier('clickable').class(clickable),
        ...bemEl.modifier('passed').class(item.passed),
        'data-test-tab-item': true,
      }}
      data-label={item.label}
      data-value={item.value}
      data-index={item.index}
      href={item.href === '' ? 'javascript:;' : item.href}
      target={item.target}
      onClick={(event: MouseEvent) => onSelectTab(event, item)}
    >
      <StepIcon item={item} isMobile={isMobile}></StepIcon>
      <StepLabel item={item}></StepLabel>
    </a>
  )
}
