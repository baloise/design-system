import { rIC } from '../helpers'
import { SingleSubject } from '../types/signal'
import { ResizeInfo, ResizeListenerFn, ResizeObserver } from './resize.interfaces'
import { ResizeListener } from './resize.listener'

export class ResizeSubject extends SingleSubject<ResizeObserver, ResizeInfo> {
  private listener = new ResizeListener<ResizeListenerFn>()

  constructor() {
    super((observer, data) => {
      rIC(() => data && observer.resizeListener(data))
    })
  }

  override attach(observer: ResizeObserver): void {
    super.attach(observer)
    this.listener.connect(observer.el)
    this.listener.add(info => super.notify(info))
  }

  override detach(): void {
    super.detach()
    this.listener.disconnect()
  }
}
