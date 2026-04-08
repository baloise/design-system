import { dsDevice } from '../device'
import { WindowResizeListener } from '../resize'
import { Subject } from '../types/signal'
import { BalOrientationInfo, OrientationObserver } from './orientation.interfaces'

export class OrientationSubject extends Subject<BalOrientationObserver> {
  private listener = new WindowResizeListener()
  private state: BalOrientationInfo = dsDevice.orientation.toObject()

  constructor() {
    super(observer => observer.orientationListener(this.state))
    this.listener.connect()
    this.listener.add(() => {
      const newState = dsDevice.orientation.toObject()
      if (!this.isEqual(newState)) {
        this.state = newState
        this.notify(undefined)
      }
    })
  }

  override attach(observer: BalOrientationObserver): void {
    super.attach(observer)
    observer.orientationListener(this.state)
  }

  private isEqual(newState: BalOrientationInfo) {
    return newState.landscape === this.state.landscape && newState.portrait === this.state.portrait
  }
}

export const dsOrientationSubject = /*@__PURE__*/ new OrientationSubject()
