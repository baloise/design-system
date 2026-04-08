import { dsDevice } from '../device'
import { SingleSubject } from '../types/signal'
import { BalSwipeInfo, BalSwipeListenerFn, SwipeObserver } from './swipe.interfaces'
import { SwipeListener } from './swipe.listener'

export class SwipeSubject extends SingleSubject<BalSwipeObserver, BalSwipeInfo> {
  private listener = new BalSwipeListener<BalSwipeListenerFn>()

  constructor(private options: { mobileOnly: boolean } = { mobileOnly: false }) {
    super((observer, data) => {
      if (data) {
        observer.swipeListener(data)
      }
    })
  }

  override attach(observer: BalSwipeObserver): void {
    if ((this.options.mobileOnly === true && dsDevice.isMobile) || this.options.mobileOnly !== true) {
      super.attach(observer)
      this.listener.connect(observer.el)
      this.listener.add(info => super.notify(info))
    }
  }

  override detach(): void {
    super.detach()
    this.listener.disconnect()
  }
}
