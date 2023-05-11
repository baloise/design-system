import { debounce } from '../helpers'
import { SingleSubject } from '../types/signal'
import { BalMutationObserver, MutationObserverOptions } from './mutation.interfaces'
import { BalMutationListener } from './mutation.listener'

export class BalMutationSubject extends SingleSubject<BalMutationObserver> {
  private listener?: BalMutationListener
  private debouncedNotify = debounce(() => this.notify(), 100)

  constructor(private options: Partial<MutationObserverOptions>) {
    super(observer => {
      if (observer.mutationObserverActive) {
        observer.mutationListener()
      }
    })
    this.listener = new BalMutationListener(options)
  }

  override attach(observer: BalMutationObserver): void {
    super.attach(observer)
    if (this.options.closest) {
      const closestElement = observer.el.closest<HTMLElement>(this.options.closest)
      if (closestElement) {
        this.listener?.connect(closestElement)
      }
    } else {
      this.listener?.connect(observer.el)
    }
    this.listener?.add(() => this.debouncedNotify())
  }

  override detach(): void {
    super.detach()
    this.listener?.disconnect()
  }
}
