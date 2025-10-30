import { HTMLStencilElement } from '@stencil/core/internal'
import type { PointerListener } from 'contactjs'
import { rOnLoad } from '../helpers'
import { ListenerAbstract } from '../types/listener'
import { BalSwipeInfo } from './swipe.interfaces'

export class BalSwipeListener<TObserver> extends ListenerAbstract<TObserver, BalSwipeInfo> {
  private PointerListenerLib: typeof PointerListener | undefined
  private pointerListener: PointerListener | undefined

  async connect(el: HTMLElement | HTMLStencilElement): Promise<void> {
    super.connect(el)
    await this.loadLib()
    if (this.PointerListenerLib) {
      this.pointerListener = new this.PointerListenerLib(el as any as HTMLElement, { handleTouchEvents: false })
      this.pointerListener.on('swipeleft', () => this.notify({ left: true, right: false }))
      this.pointerListener.on('swiperight', () => this.notify({ left: false, right: true }))
    }
  }

  disconnect(): void {
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
