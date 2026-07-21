import { HTMLStencilElement } from '@stencil/core/internal'
import { BalFloatingUi, balFloatingUi } from '../floating-ui'
import { DropdownComponent } from './component'

export class DropdownPopupUtil {
  private component!: DropdownComponent

  connectedCallback(component: DropdownComponent) {
    this.component = component
  }

  updatePanelPosition =
    (lib: BalFloatingUi, referenceEl: HTMLElement | HTMLStencilElement, floatingEl: HTMLElement | HTMLStencilElement) =>
    () => {
      lib
        .computePosition(referenceEl, floatingEl as HTMLElement, {
          placement: 'bottom-start',
          middleware: [lib.flip(), lib.shift()],
        })
        .then(({ x, y }) => {
          Object.assign(floatingEl.style, {
            left: `${x}px`,
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
  }

  collapseList() {
    this.component.isExpanded = false
    this.component.listEl?.resetFocus()
    if (this.component.panelCleanup) {
      this.component.panelCleanup()
    }
  }
}
