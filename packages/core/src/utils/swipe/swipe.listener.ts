import { HTMLStencilElement } from '@stencil/core/internal'
import type { PointerListener } from 'contactjs'
import { rOnLoad } from '../helpers'
import { ListenerAbstract } from '../types/listener'
import { BalSwipeInfo } from './swipe.interfaces'

export class BalSwipeListener<TObserver> extends ListenerAbstract<TObserver, BalSwipeInfo> {
  private PointerListenerLib: typeof PointerListener | undefined
  private pointerListener: PointerListener | undefined
  private shadowFixPointerDownListener?: (ev: PointerEvent) => void

  async connect(el: HTMLElement | HTMLStencilElement): Promise<void> {
    super.connect(el)
    await this.loadLib()
    if (this.PointerListenerLib) {
      this.pointerListener = new this.PointerListenerLib(el as any as HTMLElement, { handleTouchEvents: false })

      // contactjs calls setPointerCapture on the event target in its onPointerDown handler.
      // When a pointerdown originates inside a shadow DOM component, the browser retargets
      // the event so the target appears as the shadow host element (e.g. bal-date-calendar).
      // This causes pointer capture to be set on the shadow host, which redirects pointerup
      // away from the actual element inside the shadow DOM, preventing the click event from
      // being dispatched on the intended target (e.g. bal-date-calendar-cell).
      // Fix: release pointer capture from shadow host elements immediately after contactjs sets it.
      this.shadowFixPointerDownListener = (ev: PointerEvent) => {
        const target = ev.target as Element
        if (target && target !== el && (target as HTMLElement).shadowRoot) {
          target.releasePointerCapture(ev.pointerId)
        }
      }
      ;(el as HTMLElement).addEventListener('pointerdown', this.shadowFixPointerDownListener)

      this.pointerListener.on('swipeleft', () => this.notify({ left: true, right: false }))
      this.pointerListener.on('swiperight', () => this.notify({ left: false, right: true }))
    }
  }

  disconnect(): void {
    if (this.shadowFixPointerDownListener && this.el) {
      ;(this.el as HTMLElement).removeEventListener('pointerdown', this.shadowFixPointerDownListener)
      this.shadowFixPointerDownListener = undefined
    }
    super.disconnect()
    this.pointerListener?.destroy()
  }

  private async loadLib(): Promise<void> {
    return new Promise((resolve, reject) => {
      rOnLoad(async () => {
        import(/* @vite-ignore */ 'contactjs')
          .then(module => {
            this.PointerListenerLib = module.PointerListener
            resolve()
          })
          .catch(reject)
      })
    })
  }
}
