import { FunctionalComponent, h } from '@stencil/core'
import { BEM } from '../../../utils-new/bem'
import { BalStepOption } from '../bal-step.type'

export const StepIcon: FunctionalComponent<{ item: BalStepOption; isMobile: boolean }> = ({ item, isMobile }) => {
  const bemEl = BEM.block('steps').element('nav').element('item').element('icon')

  return (
    <span
      class={{
        ...bemEl.class(),
        ...bemEl.modifier('done').class(item.done),
        ...bemEl.modifier('active').class(item.active),
        ...bemEl.modifier('failed').class(item.failed),
        ...bemEl.modifier('disabled').class(item.disabled),
      }}
    >
      <bal-icon
        style={{ display: item.done ? 'block' : 'none' }}
        size={isMobile ? 'small' : ''}
        color="white"
        name="check"
      ></bal-icon>
      <span style={{ display: !item.done ? 'block' : 'none' }}>{item.failed ? '!' : (item.index || 0) + 1}</span>
    </span>
  )
}
