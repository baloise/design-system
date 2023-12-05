import { FOCUS_KEYS } from '../focus-visible'
import { addEventListener, removeEventListener } from '../helpers'
import { ListenerAbstract } from '../types/listener'
import { BalKeyboardInfo } from './keyboard.interfaces'

export class BalKeyboardListener<TObserver> extends ListenerAbstract<TObserver, BalKeyboardInfo> {
  private info: BalKeyboardInfo = { keyboardFocus: false }

  connect(el: HTMLElement): void {
    super.connect(el)
    addEventListener(this.el, 'keydown', this.onKeydown)
    addEventListener(this.el, 'touchstart', this.onPointerDown)
    addEventListener(this.el, 'mousedown', this.onPointerDown)
  }

  disconnect(): void {
    super.disconnect()
    if (this.el) {
      removeEventListener(this.el, 'keydown', this.onKeydown as any)
      removeEventListener(this.el, 'touchstart', this.onPointerDown)
      removeEventListener(this.el, 'mousedown', this.onPointerDown)
    }
  }

  private onKeydown = (ev: KeyboardEvent) => {
    this.info.keyboardFocus = FOCUS_KEYS.includes(ev.key)
    this.notify(this.info)
  }

  private onPointerDown = () => {
    this.info.keyboardFocus = false
    this.notify(this.info)
  }
}
