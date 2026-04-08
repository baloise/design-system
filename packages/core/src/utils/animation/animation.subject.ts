import { SingleSubject } from '../types/signal'
import { BalAnimationObserver, AnimationObserverInfo } from './animation.interfaces'
import { AnimationListener } from './animation.listener'

export class AnimationSubject extends SingleSubject<BalAnimationObserver, BalAnimationObserverInfo> {
  private listener = new AnimationListener()

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

export const dsAnimationSubject = new AnimationSubject()
