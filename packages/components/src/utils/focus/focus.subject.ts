import { SingleSubject } from '../types/signal'
import { BalFocusInfo, BalFocusListenerFn, BalFocusObserver } from './focus.interfaces'
import { BalFocusListener } from './focus.listener'

export class BalFocusSubject extends SingleSubject<BalFocusObserver, BalFocusInfo> {
  private listener = new BalFocusListener<BalFocusListenerFn>()

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

  attach(observer: BalFocusObserver): void {
    super.attach(observer)
    this.listener.connect(observer.el)
    this.listener.add(info => super.notify(info))
  }

  detach(): void {
    super.detach()
    this.listener.disconnect()
  }
}
