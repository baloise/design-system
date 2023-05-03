import { FunctionalComponent, h } from '@stencil/core'
import { BEM } from '../../../utils/bem'
import { BalTabOption } from '../bal-tab.type'

export interface TabLabelProps {
  item: BalTabOption
  inverted: boolean
  isMobile: boolean
  isVertical: boolean
  hasBubble: boolean
  context?: BalProps.BalTabsContext
}

export const TabLabel: FunctionalComponent<TabLabelProps> = ({ item, inverted, hasBubble, isVertical, context }) => {
  const bemEl = BEM.block('tabs').element('nav').element('item').element('label')

  return (
    <span
      class={{
        ...bemEl.class(),
        ...bemEl.modifier('inverted').class(inverted),
        ...bemEl.modifier('active').class(item.active),
        ...bemEl.modifier('disabled').class(item.disabled),
        ...bemEl.modifier('vertical').class(isVertical),
        ...bemEl.modifier(`context-${context}`).class(context !== undefined),
      }}
      data-testid="bal-tabs-item-label"
    >
      {item.label}
      {hasBubble ? (
        <bal-badge class={{ ...bemEl.element('bubble').class() }} size="small">
          {item.bubble}
        </bal-badge>
      ) : (
        ''
      )}
    </span>
  )
}
