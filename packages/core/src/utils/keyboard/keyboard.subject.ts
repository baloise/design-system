import { SingleSubject } from '../types/signal'
import { KeyboardInfo, KeyboardListenerFn, KeyboardObserver } from './keyboard.interfaces'
import { KeyboardListener } from './keyboard.listener'

export class KeyboardSubject extends SingleSubject<KeyboardObserver, KeyboardInfo> {
  private listener = new KeyboardListener<KeyboardListenerFn>()

  constructor() {
    super((observer, data) => {
      if (data) {
        observer.listenToKeyboard(data)
      }
    })
  }

  override attach(observer: KeyboardObserver): void {
    super.attach(observer)
    this.listener.connect(observer.el)
    this.listener.add(info => super.notify(info))
  }

  override detach(): void {
    super.detach()
    this.listener.disconnect()
  }
}
