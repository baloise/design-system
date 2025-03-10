import { FunctionalComponent, h } from '@stencil/core'
import { BEM } from '../../../utils/bem'
import { BalTabOption } from '../bal-tab.type'

export interface TabLabelProps {
  item: BalTabOption
  inverted: boolean
  isMobile: boolean
  isVertical: boolean
  isExpanded: boolean
  hasBubble: boolean
  context?: BalProps.BalTabsContext
}

export const TabLabel: FunctionalComponent<TabLabelProps> = ({
  item,
  inverted,
  hasBubble,
  isExpanded,
  isVertical,
  context,
}) => {
  const bemEl = BEM.block('tabs').element('nav').element('item').element('label')

  return (
    <span
      class={{
        ...bemEl.class(),
        ...bemEl.modifier('inverted').class(inverted),
        ...bemEl.modifier('active').class(item.active),
        ...bemEl.modifier('disabled').class(item.disabled),
        ...bemEl.modifier('vertical').class(isVertical),
        ...bemEl.modifier('expanded').class(isExpanded),
        ...bemEl.modifier(`context-${context}`).class(context !== undefined),
        ...bemEl.modifier('with-svg').class(item.svg && item.svg.length > 0),
      }}
      data-testid="bal-tabs-item-label"
    >
      {item.label}
      {item.subLabel && <span class={bemEl.element('sub-label').class()}>{item.subLabel}</span>}
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
