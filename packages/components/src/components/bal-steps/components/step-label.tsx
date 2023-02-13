import { FunctionalComponent, h } from '@stencil/core'
import { BEM } from '../../../utils/bem'
import { BalStepOption } from '../bal-step.type'

export const StepLabel: FunctionalComponent<{ item: BalStepOption }> = ({ item }) => {
  const bemEl = BEM.block('steps').element('nav').element('item').element('label')

  return (
    <span
      class={{
        ...bemEl.class(),
        ...bemEl.modifier('done').class(item.done),
        ...bemEl.modifier('active').class(item.active),
        ...bemEl.modifier('failed').class(item.failed),
        ...bemEl.modifier('disabled').class(item.disabled),
      }}
      data-testid="bal-steps-option-label"
    >
      {item.label}
    </span>
  )
}
