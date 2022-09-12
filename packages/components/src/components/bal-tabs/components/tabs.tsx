import { FunctionalComponent, h } from '@stencil/core'
import { isPlatform } from '../../../'
import { BEM } from '../../../utils/bem'
import { TabProps, TabLineProps } from '../bal-tab.type'
import { TabItem } from './tab-item'

const tabsEl = BEM.block('tabs').element('tabs')
const tabItemEl = tabsEl.element('item')

export const TabList: FunctionalComponent<TabProps> = ({
  value,
  expanded,
  border,
  float,
  tabs,
  spaceless,
  onSelectTab,
  isReady,
  iconPosition,
  lineWidth,
  lineOffsetLeft,
  lineHeight,
  lineOffsetTop,
  vertical,
  selectOnMobile,
  context,
  inverted,
}) => {
  // console.log('tabs')
  if (isPlatform('mobile') && selectOnMobile) {
    const onChange = (event: CustomEvent<string | string[] | undefined>) => {
      const selectedTabs = tabs.filter(tab => tab.value === event.detail)
      if (selectedTabs.length > 0) {
        onSelectTab(event as any, selectedTabs[0])
      }
    }
    return (
      <bal-select value={value} onBalChange={event => onChange(event)}>
        {tabs.map(tab => (
          <bal-select-option label={tab.label} value={tab.value}>
            {tab.label}
          </bal-select-option>
        ))}
      </bal-select>
    )
  }

  return (
    <div
      class={{
        ...tabsEl.class(),
        ...tabsEl.modifier(`float-${float}`).class(),
        ...tabsEl.modifier('vertical').class(vertical === true),
        ...tabsEl.modifier('vertical-on-mobile').class(vertical === 'mobile'),
        ...tabsEl.modifier('vertical-on-tablet').class(vertical === 'tablet'),
      }}
    >
      <ul>
        {tabs.map((tab, index) => {
          // console.log('tab.value ', tab.value)
          // console.log('value ', value)
          return (
            <li
              class={{
                ...tabItemEl.class(),
                ...tabItemEl.modifier('active').class(tab.value === value),
                ...tabItemEl.modifier('disabled').class(tab.disabled),
                ...tabItemEl.modifier('hidden').class(tab.hidden),
                ...tabItemEl.modifier('fullwidth').class(expanded),
                ...tabItemEl.modifier('spaceless').class(spaceless && !vertical),
                ...tabItemEl.modifier('vertical').class(vertical === true),
                ...tabItemEl.modifier('vertical-on-mobile').class(vertical === 'mobile'),
                ...tabItemEl.modifier('vertical-on-tablet').class(vertical === 'tablet'),
                'data-test-tab-item': true,
              }}
              data-label={tab.label}
              data-value={tab.value}
              data-index={index}
            >
              <TabItem
                icon={tab.icon}
                active={tab.value === value}
                inverted={inverted}
                context={context}
                vertical={vertical}
                expanded={expanded}
                iconPosition={iconPosition}
                disabled={tab.disabled}
                href={tab.href}
                label={tab.label}
                bubble={tab.bubble}
                onSelectTab={e => onSelectTab(e, tab)}
              ></TabItem>
            </li>
          )
        })}
      </ul>
      <div
        class={{
          ...tabsEl.element('border').class(),
          ...tabsEl
            .element('border')
            .modifier('vertical')
            .class(vertical === true),
          ...tabsEl
            .element('border')
            .modifier('vertical-on-mobile')
            .class(vertical === 'mobile'),
          ...tabsEl
            .element('border')
            .modifier('vertical-on-tablet')
            .class(vertical === 'tablet'),
        }}
        style={{ display: border ? 'block' : 'none' }}
      ></div>
      <TabLine
        context={context}
        vertical={vertical}
        lineOffsetLeft={lineOffsetLeft}
        lineWidth={lineWidth}
        lineOffsetTop={lineOffsetTop}
        lineHeight={lineHeight}
        inverted={inverted}
        isReady={isReady}
      ></TabLine>
    </div>
  )
}

export const TabLine: FunctionalComponent<TabLineProps> = ({
  vertical,
  isReady,
  lineWidth,
  lineOffsetLeft,
  lineHeight,
  lineOffsetTop,
  inverted,
  context,
}) => {
  const tabLineEl = tabsEl.element('line')
  let style = {}
  const isMobile = isPlatform('mobile')
  const isTablet = isPlatform('tablet')
  const isNavbarTablet = context === 'navbar' && (isMobile || isTablet)

  const isVertical = vertical === true
  const isVerticalMobile = isMobile && (vertical === 'mobile' || vertical === 'tablet')
  const isVerticalTablet = (isMobile || isTablet) && vertical === 'tablet'

  if (isVertical || isVerticalMobile || isVerticalTablet || isNavbarTablet) {
    style = {
      top: `${lineOffsetTop || 0}px`,
      height: `${lineHeight || 0}px`,
    }
  } else {
    style = {
      left: `${lineOffsetLeft || 0}px`,
      width: `${lineWidth || 0}px`,
    }
  }

  return (
    <div
      class={{
        ...tabLineEl.class(),
        ...tabLineEl.modifier('ready').class(isReady),
        ...tabLineEl.modifier(`context-${context}`).class(),
        ...tabLineEl.modifier('inverted').class(inverted),
        ...tabLineEl.modifier('vertical').class(vertical === true),
        ...tabLineEl.modifier('vertical-on-mobile').class(vertical === 'mobile'),
        ...tabLineEl.modifier('vertical-on-tablet').class(vertical === 'tablet'),
      }}
      style={style}
    ></div>
  )
}
