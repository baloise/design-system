import { FunctionalComponent, h } from '@stencil/core'
import { areArraysEqual } from '../../utils/array'
import isNil from 'lodash.isnil'
import { DropdownComponent } from './component'
import { BEM } from '../bem'
import { BalOption } from './option'
import { waitAfterFramePaint } from '../helpers'

export class DropdownValueUtil {
  private component!: DropdownComponent

  connectedCallback(component: DropdownComponent) {
    this.component = component
  }

  componentDidLoad(): void {
    setTimeout(() => this.valueChanged(this.component.value, undefined), 0)
  }

  isDisabled(): boolean {
    return this.component.disabled || this.component.readonly
  }

  isFilled(): boolean {
    return this.component.rawValue && this.component.rawValue.length > 0
  }

  valueChanged(newValue: string | string[] | undefined, oldValue: string | string[] | undefined) {
    const newValueType = typeof newValue
    const oldValueType = typeof oldValue

    if (newValueType !== oldValueType) {
      this.updateRawValueByValueProp(newValue)
    }

    if (newValueType === 'string' && newValue !== oldValue) {
      this.updateRawValueByValueProp(newValue)
    }

    if (Array.isArray(newValue) && Array.isArray(oldValue) && !areArraysEqual(newValue, oldValue)) {
      this.updateRawValueByValueProp(newValue)
    }
  }

  updateRawValueBySelection(newRawValue: string[] = [], isAutoFilled = false) {
    this.component.isAutoFilled = isAutoFilled
    this.updateRawValue(newRawValue)
    if (this.component.multiple) {
      this.component.balChange.emit(this.component.rawValue)
    } else {
      this.component.balChange.emit(this.component.rawValue[0])
    }
  }

  parseValueString(newValue: string | string[] = []) {
    let newRawValue: string[] = []

    if (!isNil(newValue) && newValue !== '') {
      if (Array.isArray(newValue)) {
        newRawValue = [...newValue.filter(v => !isNil(v))]
      } else {
        if (newValue.split('').includes(',')) {
          newRawValue = [
            ...newValue
              .split(',')
              .filter(v => v)
              .map(v => v.trim()),
          ]
        } else {
          newRawValue = [newValue]
        }
      }
    }
    return newRawValue
  }

  updateRawValueByValueProp(newValue: string | string[] = []) {
    const newRawValue = this.parseValueString(newValue)
    this.updateRawValue(newRawValue)
  }

  async updateRawValue(newRawValue: string[] = []) {
    this.component.rawValue = newRawValue

    if (this.component.listEl) {
      await this.component.listEl.updateSelected(this.component.rawValue)
    }

    await this.updateInputContent()
  }

  removeOption(option: BalOption) {
    const newRawValue = this.component.rawValue.filter(value => value !== option.value)
    this.updateRawValueBySelection(newRawValue)
  }

  async updateInputContent() {
    await waitAfterFramePaint()
    if (this.component.listEl) {
      this.component.choices = await this.component.listEl.getSelectedOptions(this.component.rawValue)
      this.component.inputLabel = this.component.choices
        .map(option => option.label.trim())
        .sort()
        .join(',')
    }
  }
}

export interface DropdownValueProps {
  filled: boolean
  chips: boolean
  invalid: boolean
  disabled: boolean
  readonly: boolean
  placeholder: string
  choices: BalOption[]
  onRemoveChip: (option: BalOption) => void
}

export const DropdownValue: FunctionalComponent<DropdownValueProps> = ({
  filled,
  chips,
  placeholder,
  choices,
  invalid,
  disabled,
  readonly,
  onRemoveChip,
}) => {
  const block = BEM.block('dropdown')

  if (filled) {
    if (chips) {
      return (
        <div class={{ ...block.element('root').element('content').element('chips').class() }}>
          {choices.map(option => (
            <bal-tag
              key={option.value}
              data-test="bal-dropdown-chip"
              size="small"
              invalid={invalid}
              disabled={disabled || readonly}
              closable={!(disabled || readonly)}
              onBalCloseClick={() => onRemoveChip(option)}
            >
              {option.label}
            </bal-tag>
          ))}
        </div>
      )
    } else {
      return choices.map(option => option.label).join(', ')
    }
  } else {
    return placeholder
  }
}
