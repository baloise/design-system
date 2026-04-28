import { dsDevice } from '../device'
import { WindowResizeListener } from '../resize'
import { Subject } from '../types/signal'
import { DsOrientationInfo, DsOrientationObserver } from './orientation.interfaces'

export class DsOrientationSubject extends Subject<DsOrientationObserver> {
  private listener = new WindowResizeListener()
  private state: DsOrientationInfo = dsDevice.orientation.toObject()

  constructor() {
    super(observer => observer.listenToOrientation(this.state))
    this.listener.connect()
    this.listener.add(() => {
      const newState = dsDevice.orientation.toObject()
      if (!this.isEqual(newState)) {
        this.state = newState
        this.notify(undefined)
      }
    })
  }

  override attach(observer: DsOrientationObserver): void {
    super.attach(observer)
    observer.listenToOrientation(this.state)
  }

  private isEqual(newState: DsOrientationInfo) {
    return newState.landscape === this.state.landscape && newState.portrait === this.state.portrait
  }
}

export const dsOrientationSubject = /*@__PURE__*/ new DsOrientationSubject()
