import { WindowResizeListener } from '../resize/window-resize.listener'
import { BalBreakpointObserver, Breakpoints } from './breakpoints.interfaces'
import { dsBreakpoints } from './breakpoints'
import { initialBreakpoints } from './breakpoints.const'
import { Subject } from '../types/signal'
import { debounce } from '../helpers'

export class BreakpointSubject extends Subject<BalBreakpointObserver> {
  private state: BalBreakpoints = initialBreakpoints
  private listener: BalWindowResizeListener = new WindowResizeListener()
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

  override attach(observer: BalBreakpointObserver): void {
    super.attach(observer)
    dsBreakpoints.detect()
    const newState = dsBreakpoints.toObject()

    if (!this.isEqual(newState)) {
      this.state = newState
      this.debouncedNotify()
    }
  }

  isEqual(newState: BalBreakpoints): boolean {
    return JSON.stringify(this.state) === JSON.stringify(newState)
  }
}

export const dsBreakpointSubject = new BreakpointSubject()
