import { debounce } from '../helpers'
import { BalWindowResizeHandler } from './window-resize.handler'
import { ListenerAbstract } from '../types/listener'

export class BalWindowResizeListener extends ListenerAbstract {
  private resizeHandler = new BalWindowResizeHandler({ onlyListenToWidthChanges: true })
  private debouncedNotify = debounce(() => this.notify(), 10)

  connect(): void {
    super.connect()
    if (this.el) {
      this.el.addEventListener('resize', this.debouncedNotify, { passive: true })
    }
  }

  disconnect(): void {
    super.disconnect()
    if (this.el) {
      this.el.removeEventListener('resize', this.debouncedNotify)
    }
  }

  notify = async () => {
    if (await this.resizeHandler.hasResized()) {
      super.notify(undefined)
    }
  }
}
