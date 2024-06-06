import { FunctionalComponent, h } from '@stencil/core'
import { DropdownComponent } from './component'
import { BEM } from '../bem'

export type DropdownFormSubmit = {
  resetHandler(ev: UIEvent)
}

export class DropdownFormSubmitUtil {
  private component!: DropdownComponent
  private resetHandlerTimer?: NodeJS.Timer

  connectedCallback(component: DropdownComponent) {
    this.component = component
    this.component.initialValue = this.component.value
  }

  componentDidRender() {
    if (this.component.selectEl) {
      const options = this.component.selectEl.querySelectorAll('option')
      options.forEach(option => {
        if (this.component.rawValue.includes(option.value)) {
          option.selected = true
        }
      })
    }
  }

  // @Listen('reset', { capture: true, target: 'document' })
  handle(ev: UIEvent) {
    const formElement = ev.target as HTMLElement
    if (formElement?.contains(this.component.el)) {
      if (this.resetHandlerTimer) {
        clearTimeout(this.resetHandlerTimer)
      }

      this.resetHandlerTimer = setTimeout(() => {
        const newRawValue = this.component.valueUtil.parseValueString(this.component.initialValue)
        this.component.valueUtil.updateRawValueBySelection(newRawValue)
      }, 0)
    }
  }
}

export interface DropdownNativeSelectProps {
  blockName: string
  name: string
  httpFormSubmit: boolean
  multiple: boolean
  required: boolean
  disabled: boolean
  rawValue: string[]
  refSelectEl: (el: HTMLSelectElement) => void
}

export const DropdownNativeSelect: FunctionalComponent<DropdownNativeSelectProps> = ({
  blockName,
  name,
  httpFormSubmit,
  multiple,
  required,
  disabled,
  rawValue,
  refSelectEl,
}) => {
  const block = BEM.block(blockName)

  return httpFormSubmit ? (
    <select
      class={{
        ...block.element('root').element('select').class(),
      }}
      aria-hidden="true"
      name={name}
      multiple={multiple}
      required={required}
      disabled={disabled}
      tabindex={-1}
      ref={refSelectEl}
    >
      {rawValue.map((value: string) => (
        <option key={value} value={value} selected>
          {value}
        </option>
      ))}
    </select>
  ) : (
    ''
  )
}
