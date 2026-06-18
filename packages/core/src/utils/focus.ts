import { createFocusTrap, type FocusTrap } from 'focus-trap'
import { dsBrowser } from './browser'

export class FocusHandler {
  private target: HTMLElement | undefined
  private focusTrap: FocusTrap | null = null
  private disabled = false
  private previousFocusedElement: HTMLElement | null = null
  private restoreElement: HTMLElement | null = null

  connect(): void {}

  disconnect(): void {
    if (!this.disabled) {
      this.disable()
    }
    this.target = undefined
    this.focusTrap = null
    this.previousFocusedElement = null
    this.restoreElement = null
  }

  isDisabled(): boolean {
    return this.disabled
  }

  enable(options?: { target?: HTMLElement | null; restoreElement?: HTMLElement | null }): void {
    if (options?.target) {
      this.target = options.target
    }

    if (this.target) {
      if (options?.restoreElement) {
        this.restoreElement = options.restoreElement
      }
      this.initializeFocusTrap()
      this.disabled = false
    }
  }

  disable(): void {
    if (!this.disabled && this.target) {
      this.deactivateFocusTrap()
      this.disabled = true
    }
  }

  private initializeFocusTrap(): void {
    if (!this.target) return

    if (dsBrowser.hasDocument && dsBrowser.hasWindow) {
      this.previousFocusedElement = document.activeElement as HTMLElement | null
    }

    this.focusTrap = createFocusTrap(this.target, {
      escapeDeactivates: false,
      fallbackFocus: this.target,
      tabbableOptions: {
        getShadowRoot: true,
      },
    })
    this.focusTrap.activate()
  }

  private deactivateFocusTrap(): void {
    if (this.focusTrap) {
      this.focusTrap.deactivate()
      this.focusTrap = null
    }
  }

  restoreFocus(el?: HTMLElement): void {
    const focusTarget = el || this.restoreElement || this.previousFocusedElement
    if (focusTarget && dsBrowser.hasDocument) {
      focusTarget.focus()
    }
  }
}
