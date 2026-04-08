import { SingleSubject } from '../types/signal'
import { BalElementStateInfo, BalElementStateListenerFn, ElementStateObserver } from './element-states.interfaces'
import { ElementStateListener } from './element-states.listener'

export class ElementStateSubject extends SingleSubject<BalElementStateObserver, BalElementStateInfo> {
  private listener = new BalElementStateListener<BalElementStateListenerFn>()

  constructor() {
    super((observer, data) => {
      if (data) {
        observer.elementStateListener(data)
      }
    })
  }

  override attach(observer: BalElementStateObserver): void {
    super.attach(observer)
    this.listener.connect(observer.el)
    this.listener.add(info => super.notify(info))
  }

  override detach(): void {
    super.detach()
    this.listener.disconnect()
  }
}
