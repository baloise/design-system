import { HTMLStencilElement } from '@stencil/core/internal'
import { addEventListener, removeEventListener, debounce, isChildOfEventTarget } from '../helpers'
import { ListenerAbstract } from '../types/listener'
import { AnimationObserverInfo } from './animation.interfaces'

export class AnimationListener extends ListenerAbstract<unknown, BalAnimationObserverInfo> {
  private debouncedNotify = debounce(target => this.notify({ target }), 42)

  private callbackWillAnimate = (ev: UIEvent) => {
    isChildOfEventTarget(ev, this.el, target => this.debouncedNotify(target))
  }

  private callbackDidAnimate = (ev: UIEvent) => {
    isChildOfEventTarget(ev, this.el, target => this.debouncedNotify(target))
  }

  override connect(el?: HTMLElement | HTMLStencilElement | Window | Document): void {
    super.connect(el)
    const win = window
    if (win) {
      addEventListener(win, 'balWillAnimate', this.callbackWillAnimate, { passive: true })
      addEventListener(win, 'balDidAnimate', this.callbackDidAnimate, { passive: true })
    }
  }

  override disconnect(): void {
    super.disconnect()
    const win = window
    if (win) {
      removeEventListener(win, 'balWillAnimate', this.callbackWillAnimate)
      removeEventListener(win, 'balDidAnimate', this.callbackDidAnimate)
    }
  }
}
