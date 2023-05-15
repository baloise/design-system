import { SingleSubject } from '../types/signal'
import { BalResizeInfo, BalResizeListenerFn, BalResizeObserver } from './resize.interfaces'
import { BalResizeListener } from './resize.listener'

export class BalResizeSubject extends SingleSubject<BalResizeObserver, BalResizeInfo> {
  private listener = new BalResizeListener<BalResizeListenerFn>()

  constructor() {
    super((observer, data) => {
      if (data) {
        observer.resizeListener(data)
      }
    })
  }

  attach(observer: BalResizeObserver): void {
    super.attach(observer)
    this.listener.connect(observer.el)
    this.listener.add(info => super.notify(info))
  }

  detach(): void {
    super.detach()
    this.listener.disconnect()
  }
}
