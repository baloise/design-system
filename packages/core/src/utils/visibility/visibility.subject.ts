import { debounce } from '../helpers'
import { SingleSubject } from '../types/signal'
import { VisibilityObserver } from './visibility.interfaces'
import { VisibilityListener } from './visibility.listener'

export class VisibilitySubject extends SingleSubject<BalVisibilityObserver> {
  private listener?: BalVisibilityListener
  private debouncedNotify = debounce(() => this.notify(), 50)

  constructor() {
    super(observer => {
      observer.visibilityListener()
    })
    this.listener = new VisibilityListener()
  }

  override attach(observer: BalVisibilityObserver): void {
    super.attach(observer)
    this.listener?.connect(observer.el)
    this.listener?.add(() => this.debouncedNotify())
  }

  override detach(): void {
    super.detach()
    this.listener?.disconnect()
  }
}
