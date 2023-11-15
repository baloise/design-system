import { balBrowser } from '../browser'
import { addEventListener, isDescendant, removeEventListener, waitAfterIdleCallback } from '../helpers'
import { ListenerAbstract } from '../types/listener'
import { BalFocusInfo } from './focus.interfaces'

export class BalFocusListener<TObserver> extends ListenerAbstract<TObserver, BalFocusInfo> {
  connect(el: HTMLElement): void {
    console.log('connect', this.el)
    super.connect(el)
    if (this.el) {
      addEventListener(this.el, 'focusin', this.onFocusin as any)
      addEventListener(this.el, 'focusout', this.onFocusout as any)
    }
  }

  disconnect(): void {
    console.log('disconnect', this.el)
    super.disconnect()
    if (this.el) {
      removeEventListener(this.el, 'focusin', this.onFocusin as any)
      removeEventListener(this.el, 'focusout', this.onFocusout as any)
    }
  }

  private onFocusin = (ev: FocusEvent) => {
    console.log('onFocusin')
    this.notify({ ev, isFocusIn: true, isFocusOut: false })
  }

  private onFocusout = async (ev: FocusEvent) => {
    console.log('onFocusout', this, this.el)
    await waitAfterIdleCallback()

    if (balBrowser.hasDocument && this.el) {
      const target = document.activeElement
      if (target && !isDescendant(this.el as any, target)) {
        this.notify({ ev, isFocusIn: false, isFocusOut: true })
      }
    }
  }
}
