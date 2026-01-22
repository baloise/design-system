import { rIC } from '../helpers'
import { SingleSubject } from '../types/signal'
import { BalResizeInfo, BalResizeListenerFn, BalResizeObserver } from './resize.interfaces'
import { BalResizeListener } from './resize.listener'

export class BalResizeSubject extends SingleSubject<BalResizeObserver, BalResizeInfo> {
  private listener = new BalResizeListener<BalResizeListenerFn>()

  constructor() {
    super((observer, data) => {
      rIC(() => data && observer.resizeListener(data))
    })
  }

  override attach(observer: BalResizeObserver): void {
    super.attach(observer)
    this.listener.connect(observer.el)
    this.listener.add(info => super.notify(info))
  }

  override detach(): void {
    super.detach()
    this.listener.disconnect()
  }
}
