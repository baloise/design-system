import { FunctionalComponent, h } from '@stencil/core'
import { ListItem } from '../../utils/calendar'
import { BEM } from '../../../../utils/bem'

export interface CalendarListProps {
  name: string
  list: ListItem[]
  isVisible: boolean
  girdHeight: number
  ref?: (el?: HTMLUListElement) => void
  onSelect: (item: ListItem) => void
}

export const CalendarList: FunctionalComponent<CalendarListProps> = ({
  name,
  isVisible,
  girdHeight,
  list,
  onSelect,
  ref,
}) => {
  const block = BEM.block('date-calendar')
  const blockBody = block.element('body')
  const blockBodyList = blockBody.element('list')

  return (
    <ul
      class={{
        ...blockBodyList.class(),
        ...blockBodyList.modifier(name).class(),
        ...blockBodyList.modifier('visible').class(isVisible),
      }}
      aria-hidden={isVisible ? 'false' : 'true'}
      style={{
        height: `${girdHeight - 2 - 8 - 8}px`,
      }}
      ref={el => (ref ? ref(el) : undefined)}
    >
      {list.map(item => (
        <li id={`${name}-${item.value}`}>
          <button
            class={{
              ...blockBodyList.element('item').class(),
              ...blockBodyList.element('item').modifier('today').class(item.today),
              ...blockBodyList.element('item').modifier('selected').class(item.selected),
              ...blockBodyList.element('item').modifier('disabled').class(item.disabled),
            }}
            disabled={item.disabled}
            tabIndex={-1}
            onClick={() => {
              if (!item.disabled) {
                onSelect(item)
              }
            }}
          >
            {item.label}
          </button>
        </li>
      ))}
    </ul>
  )
}
