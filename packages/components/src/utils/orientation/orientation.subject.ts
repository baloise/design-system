import { balDevice } from '../device'
import { BalWindowResizeListener } from '../resize'
import { Subject } from '../types/signal'
import { BalOrientationInfo, BalOrientationObserver } from './orientation.interfaces'

export class BalOrientationSubject extends Subject<BalOrientationObserver> {
  private listener = new BalWindowResizeListener()
  private state: BalOrientationInfo = balDevice.orientation.toObject()

  constructor() {
    super(observer => observer.orientationListener(this.state))
    this.listener.connect()
    this.listener.add(() => {
      const newState = balDevice.orientation.toObject()
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

export const balOrientationSubject = /*@__PURE__*/ new BalOrientationSubject()
