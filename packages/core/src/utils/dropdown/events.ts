import { FOCUS_KEYS } from '../focus-visible'
import { rIC } from '../helpers'
import { DropdownComponent } from './component'

export type DropdownEvents = {
  listenOnClickOutside(ev: UIEvent)
  listenOnClick(ev: UIEvent)
}

export class DropdownEventsUtil {
  private component!: DropdownComponent

  connectedCallback(component: DropdownComponent) {
    this.component = component
  }

  handlePointerDown = () => {
    this.component.isKeyboardMode = false
  }

  handleKeydown = (ev: any) => {
    this.component.isKeyboardMode = FOCUS_KEYS.includes(ev.key)
  }

  handleFocus(ev: FocusEvent) {
    this.component.hasFocus = true
    this.component.balFocus.emit(ev)
  }

  handleBlur(ev: FocusEvent) {
    if (!this.component.isExpanded) {
      this.component.hasFocus = false
      rIC(() => this.component.balBlur.emit(ev))
    }
  }

  handleClick(ev: MouseEvent) {
    if (!this.component.valueUtil.isDisabled()) {
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
          if (this.component.mode === 'typeahead' && this.component.nativeEl) {
            this.component.nativeEl.value = ''
            this.component.typeaheadValue = ''
          }
          this.component.valueUtil.updateRawValueBySelection([])
          return
        }
      }

      if (this.component.mode === 'typeahead' && this.component.nativeEl) {
        const targetEl = ev.target as HTMLElement

        if (targetEl === this.component.nativeEl && this.component.isExpanded) {
          return
        }

        if (!this.component.isExpanded) {
          this.component.nativeEl.select()
        }
      }

      this.component.popupUtil.toggleList()
    }
  }

  handleOutsideClick(ev: UIEvent) {
    if (this.component.isExpanded) {
      if (!this.component.el.contains(ev.target as Node)) {
        this.component.isExpanded = false
        this.component.listEl?.resetFocus()

        this.component.hasFocus = false
        rIC(() => this.component.balBlur.emit(ev as any))
      }
    }
  }
}
