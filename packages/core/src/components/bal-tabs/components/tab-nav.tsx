import { FunctionalComponent, h } from '@stencil/core'
import { BEM } from '../../../utils/bem'
import { BalTabOption } from '../bal-tab.type'
import { TabButton } from './tab-button'
import { SwiperUtil } from 'packages/core/src/utils/swiper'

export interface TabNavProps {
  swiper: SwiperUtil
  items: BalTabOption[]
  tabsId: string
  isVertical: boolean
  inNavbar: boolean
  isMobile: boolean
  isTouch: boolean
  lineActive: boolean
  border: boolean
  accordion: boolean
  isAccordionOpen: boolean
  showSwiperControls: boolean
  inverted: boolean
  clickable: boolean
  animated: boolean
  spaceless: boolean
  expanded: boolean
  isLinkList: boolean
  dimInactiveElements: boolean
  verticalColSize: BalProps.BalTabsColSize
  iconPosition: BalProps.BalTabsIconPosition
  context?: BalProps.BalTabsContext
  onSelectTab: (ev: MouseEvent, tab: BalTabOption) => void
}

export const TabNav: FunctionalComponent<TabNavProps> = ({
  swiper,
  items,
  tabsId,
  isVertical,
  inNavbar,
  isMobile,
  isTouch,
  lineActive,
  isLinkList,
  border,
  accordion,
  isAccordionOpen,
  inverted,
  clickable,
  animated,
  spaceless,
  expanded,
  verticalColSize,
  showSwiperControls,
  iconPosition,
  context,
  onSelectTab,
  dimInactiveElements,
}) => {
  const bemEl = BEM.block('tabs').element('nav')
  const navInnerEl = bemEl.element('inner')
  const navContainerEl = bemEl.element('container')
  const navLineEl = bemEl.element('line')
  const navBorderEl = bemEl.element('border')

  const tabs = items.filter(tab => !tab.invisible)
  const isFullHeight = inNavbar && !isTouch
  const hasSubLabelInGroup = items.some(item => {
    return item.subLabel && item.subLabel.length > 0
  })

  const Button: FunctionalComponent<{ item: BalTabOption; index: number }> = ({ item, index }) => (
    <TabButton
      item={item}
      isLinkList={isLinkList}
      tabsId={tabsId}
      isFirst={index === 0}
      isLast={index === tabs.length - 1}
      isMobile={isMobile}
      isVertical={isVertical}
      iconPosition={iconPosition}
      spaceless={spaceless}
      inverted={inverted}
      accordion={accordion}
      isAccordionOpen={isAccordionOpen}
      context={context}
      isExpanded={expanded}
      clickable={clickable && !item.disabled}
      onSelectTab={onSelectTab}
      hasSubLabelInGroup={hasSubLabelInGroup}
      dimInactiveElements={dimInactiveElements}
    ></TabButton>
  )

  return (
    <div
      class={{
        ...bemEl.class(),
        ...bemEl.modifier('vertical').class(isVertical),
        ...bemEl.modifier('full-height').class(isFullHeight),
        ...bemEl.modifier(`vertical-col-${verticalColSize}`).class(isVertical),
        ...swiper.cssSwiper(),
      }}
    >
      <div
        id={`${tabsId}-nav`}
        class={{
          ...swiper.cssInnerSwiper(),
          ...navInnerEl.class(),
          ...navInnerEl.modifier(`full-height`).class(isFullHeight),
        }}
        ref={el => (swiper.innerEl = el)}
      >
        <nav
          id={swiper.containerId}
          class={{
            ...swiper.cssSwiperContainer(),
            ...navContainerEl.class(),
            ...navContainerEl.modifier(`vertical`).class(isVertical),
            ...navContainerEl.modifier(`expanded`).class(expanded && !isVertical),
          }}
          role={'tablist'}
          ref={el => (swiper.containerEl = el)}
        >
          {tabs.map((tab, index) => (
            <Button item={tab} index={index}></Button>
          ))}
          <div
            id={`${tabsId}-line`}
            class={{
              ...navLineEl.class(),
              ...navLineEl.modifier(`active`).class(lineActive),
              ...navLineEl.modifier(`inverted`).class(inverted),
              ...navLineEl.modifier(`animated`).class(animated),
              ...navLineEl.modifier(`vertical`).class(isVertical),
            }}
          ></div>
          {border ? (
            <div
              id={`${tabsId}-border`}
              class={{
                ...navBorderEl.class(),
                ...navBorderEl.modifier(`inverted`).class(inverted),
                ...navBorderEl.modifier(`vertical`).class(isVertical),
              }}
            ></div>
          ) : (
            ''
          )}
        </nav>
      </div>
      {showSwiperControls ? swiper.renderControls() : ''}
    </div>
  )
}
