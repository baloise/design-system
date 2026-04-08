import { dsDevice } from '../device'
import { SingleSubject } from '../types/signal'
import { DsSwipeInfo, DsSwipeListenerFn, DsSwipeObserver } from './swipe.interfaces'
import { DsSwipeListener } from './swipe.listener'

export class DsSwipeSubject extends SingleSubject<DsSwipeObserver, DsSwipeInfo> {
  private listener = new DsSwipeListener<DsSwipeListenerFn>()

  constructor(private options: { mobileOnly: boolean } = { mobileOnly: false }) {
    super((observer, data) => {
      if (data) {
        observer.swipeListener(data)
      }
    })
  }

  override attach(observer: DsSwipeObserver): void {
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
