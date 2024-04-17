import { areArraysEqual } from '@baloise/web-app-utils'
import { stopEventBubbling } from '../form-input'
import { DropdownComponent } from './component'

export class DropdownAutoFillUtil {
  private component!: DropdownComponent

  connectedCallback(component: DropdownComponent) {
    this.component = component
  }

  handleAutoFill = async (ev: Event) => {
    stopEventBubbling(ev)
    if (this.isAutoFillAllowed()) {
      this.component.isAutoFilled = true

      const autoFillValue = this.component.nativeEl.value
      const newValue = await this.parseAutoFillValueWithOptions(autoFillValue)
      if (newValue === undefined) {
        this.component.isAutoFilled = false
        return
      }

      if (!areArraysEqual(newValue, this.component.rawValue)) {
        this.component.valueUtil.updateRawValueBySelection(newValue, true)
      }
    }
  }

  private isAutoFillAllowed(): boolean {
    return !this.component.multiple
  }

  private async parseAutoFillValueWithOptions(autoFillValue: string): Promise<string[] | undefined> {
    const options = await this.component.listEl.getOptions()
    const value = undefined

    for (let index = 0; index < options.length; index++) {
      const option = options[index]
      if (option.value === autoFillValue || option.label === autoFillValue) {
        return [option.value]
      }
    }

    return value
  }
}
