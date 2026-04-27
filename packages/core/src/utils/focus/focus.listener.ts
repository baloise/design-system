import { HTMLStencilElement } from '@stencil/core/internal'
import { dsBrowser } from '../browser'
import { addEventListener, isDescendant, removeEventListener, waitAfterIdleCallback } from '../helpers'
import { ListenerAbstract } from '../types/listener'
import { FocusInfo } from './focus.interfaces'

export class FocusListener<TObserver> extends ListenerAbstract<TObserver, FocusInfo> {
  override connect(el: HTMLElement | HTMLStencilElement): void {
    super.connect(el)
    if (this.el) {
      addEventListener(this.el, 'focusin', this.onFocusin as any)
      addEventListener(this.el, 'focusout', this.onFocusout as any)
    }
  }

  override disconnect(): void {
    super.disconnect()
    if (this.el) {
      removeEventListener(this.el, 'focusin', this.onFocusin as any)
      removeEventListener(this.el, 'focusout', this.onFocusout as any)
    }
  }

  private onFocusin = (ev: FocusEvent) => {
    this.notify({ ev, isFocusIn: true, isFocusOut: false })
  }

  private onFocusout = async (ev: FocusEvent) => {
    await waitAfterIdleCallback()

    if (dsBrowser.hasDocument && this.el) {
      const target = document.activeElement
      if (target && !isDescendant(this.el as any, target)) {
        this.notify({ ev, isFocusIn: false, isFocusOut: true })
      }
    }
  }
}
