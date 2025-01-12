import { BalAnimationListener } from './animation.listener'
import { SingleSubject } from '../types/signal'
import { BalAnimationObserver, BalAnimationObserverInfo } from './animation.interfaces'

export class BalAnimationSubject extends SingleSubject<BalAnimationObserver, BalAnimationObserverInfo> {
  private listener = new BalAnimationListener()

  constructor() {
    super((observer, data) => {
      observer.animationListener(data)
    })
  }

  attach(observer: BalAnimationObserver): void {
    super.attach(observer)
    this.listener.connect(observer.el)
    this.listener.add(info => super.notify(info))
  }

  detach(): void {
    super.detach()
    this.listener.disconnect()
  }
}

export const balAnimationSubject = new BalAnimationSubject()
