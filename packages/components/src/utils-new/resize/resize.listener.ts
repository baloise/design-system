import { debounce } from '../helpers'
import { BalResizeHandler } from './resize.handler'
import { ListenerAbstract } from '../types/listener'

export class BalResizeListener extends ListenerAbstract {
  private resizeHandler = new BalResizeHandler({ onlyListenToWidthChanges: true })
  private debouncedNotify = debounce(() => this.notify(), 100)

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
