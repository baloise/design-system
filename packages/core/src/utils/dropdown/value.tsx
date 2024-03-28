import { h } from '@stencil/core'
import { areArraysEqual } from '@baloise/web-app-utils'
import isNil from 'lodash.isnil'
import { DropdownComponent } from './component'
import { BEM } from '../bem'
import { BalOption } from './option'
import { waitForComponent } from '../helpers'

export class DropdownValueUtil {
  private component!: DropdownComponent

  connectedCallback(component: DropdownComponent) {
    this.component = component
  }

  componentDidLoad(): void {
    setTimeout(() => this.valueChanged(this.component.value, undefined), 0)
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

  updateRawValueBySelection(newRawValue: string[] = []) {
    this.component.isAutoFilled = false
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
      await waitForComponent(this.component.listEl)
      await this.component.listEl.updateSelected(this.component.rawValue)
    }

    await this.updateInputContent()
  }

  removeOption(option: BalOption) {
    const newRawValue = this.component.rawValue.filter(value => value !== option.value)
    this.updateRawValueBySelection(newRawValue)
  }

  async updateInputContent() {
    if (this.component.listEl) {
      await waitForComponent(this.component.listEl)
      const options = await this.component.listEl.getSelectedOptions(this.component.rawValue)
      this.component.inputValue = options.map(option => option.label).join(', ')

      if (!this.component.isFilled) {
        this.component.inputContent = this.component.placeholder
      } else {
        if (this.component.chips) {
          const block = BEM.block('dropdown').element('root').element('content').element('chips')
          this.component.inputContent = (
            <div class={{ ...block.class() }}>
              {options.map(option => (
                <bal-tag key={option.value} size="small" closable onBalCloseClick={() => this.removeOption(option)}>
                  {option.label}
                </bal-tag>
              ))}
            </div>
          )
        } else {
          this.component.inputContent = options.map(option => option.label).join(', ')
        }
      }
    }
  }
}
