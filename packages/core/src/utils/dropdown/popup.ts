import { autoUpdate, computePosition, flip, shift } from '@floating-ui/dom'
import { DropdownComponent } from './component'

export class DropdownPopupUtil {
  private component!: DropdownComponent

  connectedCallback(component: DropdownComponent) {
    this.component = component
  }

  updatePanelPosition = (referenceEl: HTMLElement, floatingEl: HTMLElement) => () => {
    computePosition(referenceEl, floatingEl, {
      placement: 'bottom-start',
      middleware: [flip(), shift()],
    }).then(({ x, y }) => {
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
      this.component.panelCleanup = autoUpdate(
        this.component.el,
        this.component.panelEl,
        this.updatePanelPosition(this.component.el, this.component.panelEl),
      )
    }
    this.component.isExpanded = true
    const selectedOptions = await this.component.listEl?.getSelectedOptions()
    if (selectedOptions && selectedOptions.length > 0) {
      await this.component.listEl?.focusByLabel(selectedOptions[0]?.label, { select: false })
    } else {
      await this.component.listEl?.focusFirst()
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
