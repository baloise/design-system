import { balDevice } from '../device'
import { SingleSubject } from '../types/signal'
import { BalSwipeInfo, BalSwipeListenerFn, BalSwipeObserver } from './swipe.interfaces'
import { BalSwipeListener } from './swipe.listener'

export class BalSwipeSubject extends SingleSubject<BalSwipeObserver, BalSwipeInfo> {
  private listener = new BalSwipeListener<BalSwipeListenerFn>()

  constructor(private options: { mobileOnly: boolean } = { mobileOnly: false }) {
    super((observer, data) => {
      if (data) {
        observer.swipeListener(data)
      }
    })
  }

  attach(observer: BalSwipeObserver): void {
    if ((this.options.mobileOnly === true && balDevice.isMobile) || this.options.mobileOnly !== true) {
      super.attach(observer)
      this.listener.connect(observer.el)
      this.listener.add(info => super.notify(info))
    }
  }

  detach(): void {
    super.detach()
    this.listener.disconnect()
  }
}
