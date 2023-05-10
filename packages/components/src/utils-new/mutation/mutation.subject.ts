import { debounce } from '../../utils/helpers'
import { SingleSubject } from '../types/signal'
import { BalMutationObserver, MutationObserverOptions } from './mutation.interfaces'
import { BalMutationListener } from './mutation.listener'

export class BalMutationSubject extends SingleSubject<BalMutationObserver> {
  private listener?: BalMutationListener
  private debouncedNotify = debounce(() => this.notify(), 100)

  constructor(options: Partial<MutationObserverOptions>) {
    super(observer => {
      if (observer.mutationObserverActive) {
        observer.mutationListener()
      }
    })
    this.listener = new BalMutationListener(options)
  }

  override attach(observer: BalMutationObserver): void {
    super.attach(observer)
    this.listener?.connect(observer.el)
    this.listener?.add(() => this.debouncedNotify())
  }

  override detach(): void {
    super.detach()
    this.listener?.disconnect()
  }
}
