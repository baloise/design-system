import { FunctionalComponent, h } from '@stencil/core'
import { BEM } from '../../../utils/bem'
import { stopEventBubbling } from '../../../utils/form-input'
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
  inverted: boolean
  clickable: boolean
  animated: boolean
  spaceless: boolean
  expanded: boolean
  isLinkList: boolean
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
  iconPosition,
  context,
  onSelectTab,
}) => {
  const bemEl = BEM.block('tabs').element('nav')

  const tabs = items.filter(tab => !tab.invisible)
  const isFullHeight = inNavbar && !isTouch

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
      expanded={expanded}
      clickable={clickable && !item.disabled}
      onSelectTab={onSelectTab}
    ></TabButton>
  )

  return (
    <div
      id={`${tabsId}-nav`}
      class={{
        ...swiper.cssInnerSwiper(),
        ...bemEl.class(),
        ...bemEl.modifier(`full-height`).class(isFullHeight),
        ...bemEl.modifier(`border`).class(border),
        ...bemEl.modifier(`animated`).class(animated),
        ...bemEl.modifier(`vertical`).class(isVertical),
        ...bemEl.modifier(`expanded`).class(expanded && !isVertical),
        ...bemEl.modifier(`vertical-col-${verticalColSize}`).class(isVertical),
      }}
      ref={el => (swiper.innerEl = el)}
    >
      {/* {hasCarousel ? ( */}
      <nav
        id={swiper.containerId}
        class={{
          ...swiper.cssSwiperContainer(),
          ...bemEl.element('carousel').class(),
        }}
        role={'tablist'}
        ref={el => (swiper.containerEl = el)}
        // fullHeight={isFullHeight}
        // border={border}
        // inverted={inverted}
        // controls="small"
        // items-per-view="auto"
        // steps={3}
        // onBalChange={stopEventBubbling}
      >
        {tabs.map((tab, index) => (
          <Button item={tab} index={index}></Button>
        ))}
        <div
          id={`${tabsId}-line`}
          class={{
            ...bemEl.element('line').class(),
            ...bemEl.element('line').modifier(`active`).class(lineActive),
            ...bemEl.element('line').modifier(`inverted`).class(inverted),
            ...bemEl.element('line').modifier(`animated`).class(animated),
            ...bemEl.element('line').modifier(`vertical`).class(isVertical),
          }}
        ></div>
      </nav>
      {/* // ) : (
      //   tabs.map((tab, index) => <Button item={tab} index={index}></Button>)
      // )} */}
      {/* {!hasCarousel ? (
        <div
          id={`${tabsId}-border`}
          class={{
            ...bemEl.element('border').class(),
            ...bemEl.element('border').modifier(`inverted`).class(inverted),
            ...bemEl.element('border').modifier(`vertical`).class(isVertical),
          }}
        ></div>
      ) : (
        ''
      )}
      {!hasCarousel ? (
        <div
          id={`${tabsId}-line`}
          class={{
            ...bemEl.element('line').class(),
            ...bemEl.element('line').modifier(`active`).class(lineActive),
            ...bemEl.element('line').modifier(`inverted`).class(inverted),
            ...bemEl.element('line').modifier(`animated`).class(animated),
            ...bemEl.element('line').modifier(`vertical`).class(isVertical),
          }}
        ></div>
      ) : (
        ''
      )} */}
    </div>
  )
}
