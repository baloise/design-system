import { addEventListener, removeEventListener, debounce } from '../helpers'
import { BalWindowResizeHandler } from './window-resize.handler'
import { ListenerAbstract } from '../types/listener'

export class BalWindowResizeListener extends ListenerAbstract {
  private resizeHandler = new BalWindowResizeHandler({ onlyListenToWidthChanges: true })
  private debouncedNotify = debounce(() => this.notify(), 100)

  connect(el?: HTMLElement | Window | Document): void {
    super.connect(el)
    if (this.el) {
      addEventListener(this.el, 'resize', this.debouncedNotify, { passive: true })
    }
  }

  disconnect(): void {
    super.disconnect()
    if (this.el) {
      removeEventListener(this.el, 'resize', this.debouncedNotify)
    }
  }

  notify = async () => {
    if (await this.resizeHandler.hasResized()) {
      super.notify(undefined)
    }
  }
}
