import { SingleSubject } from '../types/signal'
import { BalElementStateInfo, BalElementStateListenerFn, BalElementStateObserver } from './element-states.interfaces'
import { BalElementStateListener } from './element-states.listener'

export class BalElementStateSubject extends SingleSubject<BalElementStateObserver, BalElementStateInfo> {
  private listener = new BalElementStateListener<BalElementStateListenerFn>()

  constructor() {
    super((observer, data) => {
      if (data) {
        observer.elementStateListener(data)
      }
    })
  }

  attach(observer: BalElementStateObserver): void {
    super.attach(observer)
    this.listener.connect(observer.el)
    this.listener.add(info => super.notify(info))
  }

  detach(): void {
    super.detach()
    this.listener.disconnect()
  }
}
