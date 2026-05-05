import { WindowResizeListener } from './window-resize.listener'
import { SingleSubject } from '../types/signal'
import { WindowResizeObserver } from './window-resize.interfaces'
import { dsBrowser } from '../browser'

export class WindowResizeSubject extends SingleSubject<WindowResizeObserver> {
  private listener = new WindowResizeListener()

  constructor() {
    super((observer, _data) => {
      observer.listenToWindowResize()
    })
  }

  override attach(observer: WindowResizeObserver): void {
    super.attach(observer)
    if (dsBrowser.hasWindow) {
      this.listener.connect(window)
      this.listener.add(() => super.notify())
    }
  }

  override detach(): void {
    super.detach()
    this.listener.disconnect()
  }
}

export const dsWindowResizeSubject = new WindowResizeSubject()
