import { PointerListener } from 'contactjs'
import { ListenerAbstract } from '../types/listener'
import { BalSwipeInfo } from './swipe.interfaces'

export class BalSwipeListener<TObserver> extends ListenerAbstract<TObserver, BalSwipeInfo> {
  private pointerListener: PointerListener | undefined

  connect(el: HTMLElement): void {
    super.connect(el)
    this.pointerListener = new PointerListener(el, {})
    this.pointerListener.on('swipeleft', () => this.notify({ left: true, right: false }))
    this.pointerListener.on('swiperight', () => this.notify({ left: false, right: true }))
  }

  disconnect(): void {
    super.disconnect()
    this.pointerListener?.destroy()
  }
}
