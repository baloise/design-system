import { h } from '@stencil/core'
import { BEM } from '../bem'
import { DropdownComponent } from './component'

export type DropdownFormReset = {
  resetHandler(ev: UIEvent)
}

export class DropdownFormResetUtil {
  private component!: DropdownComponent
  private resetHandlerTimer?: NodeJS.Timer

  connectedCallback(component: DropdownComponent) {
    this.component = component
    this.component.initialValue = this.component.value
  }

  componentDidRender() {
    if (this.component.nativeEl) {
      const options = this.component.nativeEl.querySelectorAll('option')
      options.forEach(option => {
        if (this.component.rawValue.includes(option.value)) {
          option.selected = true
        }
      })
      if (!this.component.multiple) {
        const firstValue = this.component.rawValue[0]
        if (firstValue) {
          this.component.nativeEl.value = firstValue
        }
      }
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

  render() {
    const block = BEM.block('dropdown')

    return (
      <select
        class={{
          ...block.element('native').class(),
        }}
        aria-hidden="true"
        data-native
        tabindex="-1"
        autoComplete={this.component.autocomplete}
        name={this.component.name}
        multiple={this.component.multiple}
        disabled={this.component.disabled}
        required={this.component.required}
        ref={nativeEl => (this.component.nativeEl = nativeEl)}
        onChange={ev => this.component.nativeSelectChanged(ev)}
      >
        {this.component.rawValue.map((value: string) => (
          <option key={value} value={value} selected={true}>
            {value}
          </option>
        ))}
      </select>
    )
  }
}
