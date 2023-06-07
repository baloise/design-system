import { FOCUS_KEYS } from '../focus-visible'
import { ListenerAbstract } from '../types/listener'
import { BalKeyboardInfo } from './keyboard.interfaces'

export class BalKeyboardListener<TObserver> extends ListenerAbstract<TObserver, BalKeyboardInfo> {
  private info: BalKeyboardInfo = { keyboardFocus: false }

  connect(el: HTMLElement): void {
    super.connect(el)
    el.addEventListener('keydown', this.onKeydown)
    el.addEventListener('touchstart', this.onPointerDown)
    el.addEventListener('mousedown', this.onPointerDown)
  }

  disconnect(): void {
    super.disconnect()
    if (this.el) {
      this.el.removeEventListener('keydown', this.onKeydown as any)
      this.el.removeEventListener('touchstart', this.onPointerDown)
      this.el.removeEventListener('mousedown', this.onPointerDown)
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
