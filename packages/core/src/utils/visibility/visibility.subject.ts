import { debounce } from '../helpers'
import { SingleSubject } from '../types/signal'
import { VisibilityObserver } from './visibility.interfaces'
import { VisibilityListener } from './visibility.listener'

export class VisibilitySubject extends SingleSubject<VisibilityObserver> {
  private listener?: VisibilityListener
  private debouncedNotify = debounce(() => this.notify(), 50)

  constructor() {
    super(observer => {
      observer.visibilityListener()
    })
    this.listener = new VisibilityListener()
  }

  override attach(observer: VisibilityObserver): void {
    super.attach(observer)
    this.listener?.connect(observer.el)
    this.listener?.add(() => this.debouncedNotify())
  }

  override detach(): void {
    super.detach()
    this.listener?.disconnect()
  }
}
