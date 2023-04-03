import { FunctionalComponent, h } from '@stencil/core'
import { Props } from '../../../types'
import { BEM } from '../../../utils/bem'
import { BalTabOption } from '../bal-tab.type'
import { TabIcon } from './tab-icon'
import { TabLabel } from './tab-label'

export interface TabButtonProps {
  item: BalTabOption
  tabsId: string
  isFirst: boolean
  isLast: boolean
  isMobile: boolean
  isVertical: boolean
  accordion: boolean
  isAccordionOpen: boolean
  inverted: boolean
  expanded: boolean
  spaceless: boolean
  clickable: boolean
  iconPosition: Props.BalTabsIconPosition
  context?: BalProps.BalTabsContext
  onSelectTab: (event: MouseEvent, item: BalTabOption) => void
}

export const TabButton: FunctionalComponent<TabButtonProps> = ({
  item,
  tabsId,
  isFirst,
  isLast,
  isMobile,
  isVertical,
  accordion,
  isAccordionOpen,
  inverted,
  expanded,
  spaceless,
  clickable,
  iconPosition,
  context,
  onSelectTab,
}) => {
  const bemEl = BEM.block('tabs').element('nav').element('item')

  if (item.hidden) {
    return
  }

  const hasBubble = item.bubble !== false
  const hasIcon = item.icon !== undefined

  const hasIconBubble =
    (hasIcon && hasBubble && iconPosition !== 'horizontal' && !accordion) ||
    (isMobile && hasIcon && hasBubble && !isVertical && !accordion)

  const hasAccordionIconBubble =
    (accordion && hasBubble) || (accordion && isMobile && hasIcon && hasBubble && !isVertical)

  const hasLabelBubble =
    (!hasIcon && hasBubble && !accordion) ||
    (hasBubble && !isMobile && iconPosition === 'horizontal' && !accordion) ||
    (hasBubble && isVertical && !accordion)

  return (
    <a
      role="tab"
      id={`${tabsId}-button`}
      class={{
        ...bemEl.class(),
        ...bemEl.modifier('active').class(item.active),
        ...bemEl.modifier('disabled').class(item.disabled),
        ...bemEl.modifier('clickable').class(clickable),
        ...bemEl.modifier('accordion').class(accordion),
        ...bemEl.modifier('inverted').class(inverted),
        ...bemEl.modifier('expanded').class(expanded),
        ...bemEl.modifier('spaceless').class(spaceless),
        ...bemEl.modifier('first').class(isFirst),
        ...bemEl.modifier('last').class(isLast),
        ...bemEl.modifier('passed').class(item.passed),
        ...bemEl.modifier('vertical').class(isVertical),
        ...bemEl.modifier(`context-${context}`).class(context !== undefined),
        ...bemEl.modifier(`icon-position-${iconPosition}`).class(iconPosition !== 'horizontal'),
        'bal-focusable': !item.disabled && !item.hidden,
      }}
      draggable={false}
      data-label={item.label}
      data-value={item.value}
      data-index={item.index}
      data-testid="bal-tabs-item"
      aria-disabled={`${item.disabled}`}
      href={item.href === '' ? 'javascript:;' : item.href}
      target={item.target}
      onClick={(event: MouseEvent) => onSelectTab(event, item)}
    >
      {item.icon ? (
        <TabIcon
          accordion={false}
          item={item}
          isMobile={isMobile}
          hasBubble={hasIconBubble}
          inverted={inverted}
        ></TabIcon>
      ) : (
        ''
      )}
      <TabLabel
        item={item}
        isMobile={isMobile}
        isVertical={isVertical}
        hasBubble={hasLabelBubble}
        inverted={inverted}
        context={context}
      ></TabLabel>
      {accordion && !item.href ? (
        <TabIcon
          accordion={accordion}
          isAccordionOpen={isAccordionOpen}
          item={item}
          isMobile={isMobile}
          hasBubble={hasAccordionIconBubble}
          inverted={inverted}
        ></TabIcon>
      ) : (
        ''
      )}
    </a>
  )
}
