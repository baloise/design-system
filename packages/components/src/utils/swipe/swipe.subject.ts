import { SingleSubject } from '../types/signal'
import { BalSwipeInfo, BalSwipeListenerFn, BalSwipeObserver } from './swipe.interfaces'
import { BalSwipeListener } from './swipe.listener'

export class BalSwipeSubject extends SingleSubject<BalSwipeObserver, BalSwipeInfo> {
  private listener = new BalSwipeListener<BalSwipeListenerFn>()

  constructor() {
    super((observer, data) => {
      if (data) {
        observer.swipeListener(data)
      }
    })
  }

  attach(observer: BalSwipeObserver): void {
    super.attach(observer)
    this.listener.connect(observer.el)
    this.listener.add(info => super.notify(info))
  }

  detach(): void {
    super.detach()
    this.listener.disconnect()
  }
}
