import { FunctionalComponent, h } from '@stencil/core'
import { BEM } from '../bem'
import { DropdownMode } from './mode'
import { BalOption } from './option'

export interface DropdownOptionListProps {
  mode: DropdownMode
  inputId: string
  block: string
  filter: BalProps.BalOptionListFilter
  required: boolean
  isExpanded: boolean
  isDisabled: boolean
  hasPropOptions: boolean
  multiple: boolean
  contentHeight: number
  rawOptions: BalOption[]
  refPanelEl: (el: HTMLDivElement) => void
  refListEl: (el: HTMLBalOptionListElement) => void
}

export const DropdownOptionList: FunctionalComponent<DropdownOptionListProps> = ({
  mode,
  inputId,
  isExpanded,
  rawOptions,
  isDisabled,
  hasPropOptions,
  required,
  filter,
  multiple,
  contentHeight,
  refPanelEl,
  refListEl,
}) => {
  const block = BEM.block('dropdown')

  return (
    <div
      id={`${inputId}-menu`}
      class={{
        ...block.element('list').class(),
        ...block.element('list').modifier('expanded').class(isExpanded),
        ...block
          .element('list')
          .modifier('typeahead')
          .class(mode === DropdownMode.Typeahead),
      }}
      ref={refPanelEl}
    >
      <bal-option-list
        multiple={multiple}
        disabled={isDisabled}
        filter={filter}
        required={required}
        contentHeight={contentHeight}
        ref={refListEl}
      >
        <slot />
        {hasPropOptions
          ? rawOptions.map(option => (
              <bal-option
                key={option.value}
                value={option.value}
                label={option.label}
                disabled={option.disabled}
                multiline={option.multiline}
                invalid={option.invalid}
                hidden={option.hidden}
                selected={option.selected}
                focused={option.focused}
              >
                {option.label}
              </bal-option>
            ))
          : ''}
      </bal-option-list>
    </div>
  )
}
