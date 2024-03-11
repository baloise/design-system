import { FunctionalComponent, h } from '@stencil/core'
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
  iconPosition: BalProps.BalTabsIconPosition
  context?: BalProps.BalTabsContext
  onSelectTab: (ev: MouseEvent, item: BalTabOption) => void
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

  if (item.invisible) {
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

  const TagType = item.href === undefined || item.href === '' ? 'button' : 'a'
  const attrs =
    TagType === 'button'
      ? { type: 'button' }
      : {
          href: item.href,
          target: item.target,
        }

  return (
    <TagType
      id={`${tabsId}-button-${TabButtonIds++}`}
      role="tab"
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
        'bal-focusable': !item.disabled && !item.invisible,
      }}
      draggable={false}
      data-tabs={tabsId}
      data-label={item.label}
      data-value={item.value}
      data-index={item.index}
      data-testid="bal-tabs-item"
      aria-selected={item.active ? 'true' : 'false'}
      aria-disabled={`${item.disabled}`}
      aria-label={item.label}
      aria-controls={item.tabPanelID}
      {...attrs}
      onClick={(ev: MouseEvent) => onSelectTab(ev, item)}
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
    </TagType>
  )
}

let TabButtonIds = 0
