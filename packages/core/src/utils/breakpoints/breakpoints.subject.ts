import { WindowResizeListener } from '../resize/window-resize.listener'
import { DsBreakpointObserver, DsBreakpoints } from './breakpoints.interfaces'
import { dsBreakpoints } from './breakpoints'
import { initialBreakpoints } from './breakpoints.const'
import { Subject } from '../types/signal'
import { debounce } from '../helpers'

export class DsBreakpointSubject extends Subject<DsBreakpointObserver> {
  private state: DsBreakpoints = initialBreakpoints
  private listener: WindowResizeListener = new WindowResizeListener()
  private debouncedNotify = debounce(() => this.notify(), 50)

  constructor() {
    super(observer => observer.breakpointListener(this.state))
    this.listener.connect()
    this.listener.add(() => {
      dsBreakpoints.detect()
      const newState = dsBreakpoints.toObject()
      if (!this.isEqual(newState)) {
        this.state = newState
        this.debouncedNotify()
      }
    })
  }

  override attach(observer: DsBreakpointObserver): void {
    super.attach(observer)
    dsBreakpoints.detect()
    const newState = dsBreakpoints.toObject()

    if (!this.isEqual(newState)) {
      this.state = newState
      this.debouncedNotify()
    }
  }

  isEqual(newState: DsBreakpoints): boolean {
    return JSON.stringify(this.state) === JSON.stringify(newState)
  }
}

export const dsBreakpointSubject = new DsBreakpointSubject()
