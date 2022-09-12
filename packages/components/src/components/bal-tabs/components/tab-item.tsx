import { FunctionalComponent, h } from '@stencil/core'
import { BEM } from '../../../utils/bem'
import { TabItemProps } from '../bal-tab.type'

const buttonEl = BEM.block('tabs').element('tabs').element('item').element('button')

export const TabItem: FunctionalComponent<TabItemProps> = ({
  icon,
  expanded,
  disabled,
  href,
  label,
  vertical,
  iconPosition,
  bubble,
  active,
  context,
  inverted,
  onSelectTab,
}) => {
  const cssClasses = {
    ...buttonEl.class(),
    ...buttonEl.modifier(`context-${context}`).class(),
    ...buttonEl.modifier('vertical').class(vertical == true),
    ...buttonEl.modifier('vertical-on-mobile').class(vertical === 'mobile'),
    ...buttonEl.modifier('vertical-on-tablet').class(vertical === 'tablet'),
    ...buttonEl.modifier('fullwidth').class(expanded),
    ...buttonEl.modifier('disabled').class(disabled),
    ...buttonEl.modifier('inverted').class(inverted),
    ...buttonEl.modifier('active').class(active),
    ...buttonEl.modifier(`icon-${iconPosition}`).class(true),
    ...buttonEl.modifier('icon').class(icon !== undefined),
  }

  let hrefAttribute = {
    href: 'javascript:;',
  }
  if (href) {
    hrefAttribute = {
      href,
    }
  }

  const bubbleString = bubble === true || bubble === false ? '' : bubble
  const labelString = label

  return (
    <a
      class={cssClasses}
      {...hrefAttribute}
      aria-disabled={`${disabled}`}
      aria-current="page"
      onClick={e => onSelectTab(e)}
    >
      <bal-icon
        class={{ ...buttonEl.element('icon').class() }}
        name={icon}
        size="small"
        turn={active}
        style={{ display: icon ? 'flex' : 'none' }}
      ></bal-icon>
      <span>
        {labelString}
        <bal-badge
          position="tabs"
          size={bubbleString === '' ? 'small' : ''}
          style={{ display: bubble ? 'flex' : 'none' }}
        >
          {bubbleString}
        </bal-badge>
      </span>
    </a>
  )
}
