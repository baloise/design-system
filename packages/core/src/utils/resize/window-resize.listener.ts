import { addEventListener, debounce, removeEventListener } from '../helpers'
import { ListenerAbstract } from '../types/listener'
import { BalWindowResizeHandler } from './window-resize.handler'

export class BalWindowResizeListener extends ListenerAbstract {
  private resizeHandler = new BalWindowResizeHandler({ onlyListenToWidthChanges: true })
  private debouncedNotify = debounce(() => this.notify(), 100)

  override connect(el?: HTMLElement | Window | Document): void {
    super.connect(el)
    if (this.el) {
      addEventListener(this.el, 'resize', this.debouncedNotify, { passive: true })
    }
  }

  override disconnect(): void {
    super.disconnect()
    if (this.el) {
      removeEventListener(this.el, 'resize', this.debouncedNotify)
    }
  }

  override notify = async () => {
    if (await this.resizeHandler.hasResized()) {
      super.notify(undefined)
    }
  }
}
