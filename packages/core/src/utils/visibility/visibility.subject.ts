import { debounce } from '../helpers'
import { SingleSubject } from '../types/signal'
import { BalVisibilityObserver } from './visibility.interfaces'
import { BalVisibilityListener } from './visibility.listener'

export class BalVisibilitySubject extends SingleSubject<BalVisibilityObserver> {
  private listener?: BalVisibilityListener
  private debouncedNotify = debounce(() => this.notify(), 50)

  constructor() {
    super(observer => {
      observer.visibilityListener()
    })
    this.listener = new BalVisibilityListener()
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
