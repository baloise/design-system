import { SingleSubject } from '../types/signal'
import { BalAnimationObserver, BalAnimationObserverInfo } from './animation.interfaces'
import { BalAnimationListener } from './animation.listener'

export class BalAnimationSubject extends SingleSubject<BalAnimationObserver, BalAnimationObserverInfo> {
  private listener = new BalAnimationListener()

  constructor() {
    super((observer, data) => {
      data && observer.animationListener(data)
    })
  }

  override attach(observer: BalAnimationObserver): void {
    super.attach(observer)
    this.listener.connect(observer.el)
    this.listener.add((info: any) => super.notify(info))
  }

  override detach(): void {
    super.detach()
    this.listener.disconnect()
  }
}

export const balAnimationSubject = new BalAnimationSubject()
