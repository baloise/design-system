import { BalFloatingUi, balFloatingUi } from '../floating-ui'
import { DropdownComponent } from './component'

export class DropdownPopupUtil {
  private component!: DropdownComponent

  connectedCallback(component: DropdownComponent) {
    this.component = component
  }

  updatePanelPosition = (lib: BalFloatingUi, referenceEl: HTMLElement, floatingEl: HTMLElement) => () => {
    lib
      .computePosition(referenceEl, floatingEl, {
        placement: 'bottom-start',
        middleware: [lib.flip(), lib.shift()],
      })
      .then(({ x, y }) => {
        Object.assign(floatingEl.style, {
          top: `${y}px`,
        })
      })
  }

  toggleList() {
    if (!this.component.valueUtil.isDisabled()) {
      if (this.component.isExpanded) {
        this.collapseList()
      } else {
        this.expandList()
      }
    }
  }

  async expandList() {
    if (this.component.panelEl) {
      const lib = await balFloatingUi.load()
      this.component.panelCleanup = lib.autoUpdate(
        this.component.el,
        this.component.panelEl,
        this.updatePanelPosition(lib, this.component.el, this.component.panelEl),
      )
    }
    this.component.isExpanded = true
    await this.component.listEl?.focusSelected()

    /**
     * If the dropdown is in typeahead mode, we want to focus the input element
     * and select its content to allow the user to start typing immediately.
     */
    if (this.component.mode === 'typeahead' && this.component.nativeEl) {
      await this.component.nativeEl?.focus()
    }
  }

  collapseList() {
    this.component.isExpanded = false
    this.component.listEl?.resetFocus()
    if (this.component.panelCleanup) {
      this.component.panelCleanup()
    }
  }
}
