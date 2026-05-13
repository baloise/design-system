import { HTMLStencilElement } from '@stencil/core/internal'
import { dsBrowser } from '../browser'
import { Subject } from './signal'

export type ListenerFn = () => void

export abstract class ListenerAbstract<TListener = ListenerFn, TData = undefined> extends Subject<TListener, TData> {
  public el?: HTMLElement | HTMLStencilElement | Window | Document = undefined

  connect(el?: HTMLElement | HTMLStencilElement | Window | Document): void {
    if (el) {
      this.el = el
    } else {
      if (dsBrowser.hasWindow) {
        this.el = window
      }
    }
  }

  disconnect() {
    this.el = undefined
  }

  add(listener: TListener): void {
    super.attach(listener)
  }

  remove(listener: TListener): void {
    super.detach(listener)
  }
}
