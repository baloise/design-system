import { BalWindowResizeListener } from './window-resize.listener'
import { SingleSubject } from '../types/signal'
import { BalWindowResizeObserver } from './window-resize.interfaces'
import { balBrowser } from '../browser'

export class BalWindowResizeSubject extends SingleSubject<BalWindowResizeObserver> {
  private listener = new BalWindowResizeListener()

  constructor() {
    super((observer, _data) => {
      observer.windowResizeListener()
    })
  }

  attach(observer: BalWindowResizeObserver): void {
    super.attach(observer)
    if (balBrowser.hasWindow) {
      this.listener.connect(window)
      this.listener.add(() => super.notify())
    }
  }

  detach(): void {
    super.detach()
    this.listener.disconnect()
  }
}

export const balWindowResizeSubject = new BalWindowResizeSubject()
