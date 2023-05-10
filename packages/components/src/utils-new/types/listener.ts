import { balBrowser } from '../../utils/browser'
import { Subject } from './signal'

export type ListenerFn = () => void

export abstract class ListenerAbstract<TListener = ListenerFn, TData = undefined> extends Subject<TListener, TData> {
  public el?: HTMLElement | Window | Document = undefined

  connect(el?: HTMLElement | Window | Document): void {
    if (el) {
      this.el = el
    } else {
      if (balBrowser.hasWindow) {
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
