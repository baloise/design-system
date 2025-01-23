import { addEventListener, removeEventListener, debounce, isChildOfEventTarget } from '../helpers'
import { ListenerAbstract } from '../types/listener'
import { BalAnimationObserverInfo } from './animation.interfaces'

export class BalAnimationListener extends ListenerAbstract<unknown, BalAnimationObserverInfo> {
  private debouncedNotify = debounce(target => this.notify({ target }), 42)

  private callbackWillAnimate = (ev: UIEvent) => {
    isChildOfEventTarget(ev, this.el, target => this.debouncedNotify(target))
  }

  private callbackDidAnimate = (ev: UIEvent) => {
    isChildOfEventTarget(ev, this.el, target => this.debouncedNotify(target))
  }

  connect(el?: HTMLElement | Window | Document): void {
    super.connect(el)
    const win = window
    if (win) {
      addEventListener(win, 'balWillAnimate', this.callbackWillAnimate, { passive: true })
      addEventListener(win, 'balDidAnimate', this.callbackDidAnimate, { passive: true })
    }
  }

  disconnect(): void {
    super.disconnect()
    const win = window
    if (win) {
      removeEventListener(win, 'balWillAnimate', this.callbackWillAnimate)
      removeEventListener(win, 'balDidAnimate', this.callbackDidAnimate)
    }
  }
}
