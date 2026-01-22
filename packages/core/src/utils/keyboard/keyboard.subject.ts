import { SingleSubject } from '../types/signal'
import { BalKeyboardInfo, BalKeyboardListenerFn, BalKeyboardObserver } from './keyboard.interfaces'
import { BalKeyboardListener } from './keyboard.listener'

export class BalKeyboardSubject extends SingleSubject<BalKeyboardObserver, BalKeyboardInfo> {
  private listener = new BalKeyboardListener<BalKeyboardListenerFn>()

  constructor() {
    super((observer, data) => {
      if (data) {
        observer.keyboardListener(data)
      }
    })
  }

  override attach(observer: BalKeyboardObserver): void {
    super.attach(observer)
    this.listener.connect(observer.el)
    this.listener.add(info => super.notify(info))
  }

  override detach(): void {
    super.detach()
    this.listener.disconnect()
  }
}
