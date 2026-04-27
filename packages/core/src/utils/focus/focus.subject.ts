import { SingleSubject } from '../types/signal'
import { FocusInfo, FocusListenerFn, FocusObserver } from './focus.interfaces'
import { FocusListener } from './focus.listener'

export class FocusSubject extends SingleSubject<FocusObserver, FocusInfo> {
  private listener = new FocusListener<FocusListenerFn>()

  constructor() {
    super((observer, data) => {
      if (data) {
        if (data.isFocusIn) {
          if (observer.hasFocus === false) {
            observer.focusInListener(data.ev)
          }

          observer.hasFocus = true
        }
        if (data.isFocusOut) {
          observer.focusOutListener(data.ev)
          observer.hasFocus = false
        }
      }
    })
  }

  override attach(observer: FocusObserver): void {
    super.attach(observer)
    this.listener.connect(observer.el)
    this.listener.add(info => super.notify(info))
  }

  override detach(): void {
    super.detach()
    this.listener.disconnect()
  }
}
