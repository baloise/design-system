import { FunctionalComponent, h } from '@stencil/core'
import { BEM } from '../../../utils/bem'
import { BalTabOption } from '../bal-tab.type'

export interface TabIconProps {
  item: BalTabOption
  accordion: boolean
  isAccordionOpen?: boolean
  isMobile: boolean
  inverted: boolean
  hasBubble: boolean
}

export const TabIcon: FunctionalComponent<TabIconProps> = ({
  item,
  inverted,
  accordion,
  isAccordionOpen,
  isMobile,
  hasBubble,
}) => {
  const bemEl = BEM.block('tabs').element('nav').element('item').element('icon')

  let iconColor: BalProps.BalIconColor = item.disabled ? 'grey' : 'primary'
  if (inverted) {
    iconColor = item.disabled ? 'primary-light' : 'white'
  }

  return (
    <span
      class={{
        ...bemEl.class(),
        ...bemEl.modifier('active').class(item.active),
        ...bemEl.modifier('disabled').class(item.disabled),
      }}
    >
      <bal-icon
        size={isMobile || accordion ? 'small' : ''}
        name={accordion ? 'nav-go-down' : item.icon}
        color={iconColor}
        turn={accordion && isAccordionOpen === true && item.active}
      ></bal-icon>
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
