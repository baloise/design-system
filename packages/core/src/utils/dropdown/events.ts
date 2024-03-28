import { DropdownComponent } from './component'
import { stopEventBubbling } from '../form-input'

export type DropdownEvents = {
  listenOnClickOutside(ev: UIEvent)
  listenOnClick(ev: UIEvent)
}

export class DropdownEventsUtil {
  private component!: DropdownComponent

  connectedCallback(component: DropdownComponent) {
    this.component = component
  }

  handleFocus(_ev: FocusEvent) {
    this.component.hasFocus = true
  }

  handleBlur(_ev: FocusEvent) {
    this.component.hasFocus = false
  }

  handleClick(ev: MouseEvent) {
    if (!this.component.isDisabled) {
      if (this.component.chips) {
        const targetEl = ev.target as HTMLElement
        const closeEl = targetEl.closest('bal-close')
        if (closeEl) {
          return
        }
      }

      if (this.component.clearable) {
        const targetEl = ev.target as HTMLElement
        const clearEl = targetEl.closest('.bal-dropdown__clear')
        if (clearEl) {
          this.component.updateRawValueBySelection([])
          return
        }
      }

      this.component.toggleList()
    }
  }

  // @Listen('click', { target: 'document' })
  handleOutsideClick(ev: UIEvent) {
    if (this.component.isExpanded) {
      if (!this.component.el.contains(ev.target as Node)) {
        this.component.isExpanded = false
        this.component.listEl?.resetFocus()
      }
    }
  }
}
