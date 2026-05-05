import { SingleSubject } from '../types/signal'
import { ElementStateInfo, ElementStateListenerFn, ElementStateObserver } from './element-states.interfaces'
import { ElementStateListener } from './element-states.listener'

export class ElementStateSubject extends SingleSubject<ElementStateObserver, ElementStateInfo> {
  private listener = new ElementStateListener<ElementStateListenerFn>()

  constructor() {
    super((observer, data) => {
      if (data) {
        observer.listenToElementState(data)
      }
    })
  }

  override attach(observer: ElementStateObserver): void {
    super.attach(observer)
    this.listener.connect(observer.el)
    this.listener.add(info => super.notify(info))
  }

  override detach(): void {
    super.detach()
    this.listener.disconnect()
  }
}
