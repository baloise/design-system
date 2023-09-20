import { balBrowser } from '../browser'
import { isDescendant, waitAfterIdleCallback } from '../helpers'
import { ListenerAbstract } from '../types/listener'
import { BalFocusInfo } from './focus.interfaces'

export class BalFocusListener<TObserver> extends ListenerAbstract<TObserver, BalFocusInfo> {
  connect(el: HTMLElement): void {
    super.connect(el)
    if (this.el) {
      this.el.addEventListener('focusin', this.onFocusin as any)
      this.el.addEventListener('focusout', this.onFocusout as any)
    }
  }

  disconnect(): void {
    super.disconnect()
    if (this.el) {
      this.el.removeEventListener('focusin', this.onFocusin as any)
      this.el.removeEventListener('focusout', this.onFocusout as any)
    }
  }

  private onFocusin = (ev: FocusEvent) => {
    this.notify({ ev, isFocusIn: true, isFocusOut: false })
  }

  private onFocusout = async (ev: FocusEvent) => {
    await waitAfterIdleCallback()

    if (balBrowser.hasDocument && this.el) {
      const target = document.activeElement
      if (target && !isDescendant(this.el as any, target)) {
        this.notify({ ev, isFocusIn: false, isFocusOut: true })
      }
    }
  }
}
